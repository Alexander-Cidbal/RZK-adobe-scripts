#target photoshop

// Función principal que se ejecuta al iniciar el script
function main() {

    // Variables para almacenar las rutas seleccionadas
    var inputFolderPath = null;
    var exportFolderPath = null;

    // --- Creación de la ventana de diálogo ---
    // new Window(tipo, titulo, [posicionX, posicionY, ancho, alto])
    var dialog = new Window('dialog', 'RZK Exportador de Archivos');
    dialog.orientation = 'column'; // Organiza los elementos verticalmente
    dialog.alignChildren = ['fill', 'top']; // Alinea los elementos hijos

    // --- Grupo para mostrar las rutas seleccionadas ---
    var pathGroup = dialog.add('group');
    pathGroup.orientation = 'column';
    pathGroup.alignChildren = ['left', 'center'];

    // Etiqueta y texto para la ruta de archivos de entrada
    pathGroup.add('statictext', undefined, 'Carpeta de Archivos:');
    var inputPathText = pathGroup.add('statictext', [0, 0, 350, 20], 'No seleccionada', { truncate: 'middle' }); // Texto estático para mostrar la ruta

    // Etiqueta y texto para la ruta de exportación
    pathGroup.add('statictext', undefined, 'Carpeta de Exportación:');
    var exportPathText = pathGroup.add('statictext', [0, 0, 350, 20], 'No seleccionada', { truncate: 'middle' }); // Texto estático para mostrar la ruta

    // --- Grupo para los botones ---
    var buttonGroup = dialog.add('group');
    buttonGroup.orientation = 'row'; // Organiza los botones horizontalmente
    buttonGroup.alignment = ['center', 'top']; // Centra el grupo de botones

    // --- Botón "Ruta archivos" ---
    var btnInputFolder = buttonGroup.add('button', undefined, 'Ruta archivos');
    btnInputFolder.helpTip = 'Selecciona la carpeta con los archivos a procesar.'; // Texto de ayuda al pasar el ratón

    // Acción al hacer clic en "Ruta archivos"
    btnInputFolder.onClick = function() {
        var folder = Folder.selectDialog('Selecciona la carpeta de entrada');
        if (folder) { // Si el usuario seleccionó una carpeta y no canceló
            inputFolderPath = folder;
            inputPathText.text = folder.fsName; // Muestra la ruta seleccionada
            // Opcional: Habilitar Aceptar si ambas rutas están listas
            // btnAccept.enabled = (inputFolderPath !== null && exportFolderPath !== null);
        }
    };

    // --- Botón "ruta export" ---
    var btnExportFolder = buttonGroup.add('button', undefined, 'Ruta export');
    btnExportFolder.helpTip = 'Selecciona la carpeta donde se guardarán los resultados.';

    // Acción al hacer clic en "ruta export"
    btnExportFolder.onClick = function() {
        var folder = Folder.selectDialog('Selecciona la carpeta de exportación');
        if (folder) { // Si el usuario seleccionó una carpeta y no canceló
            exportFolderPath = folder;
            exportPathText.text = folder.fsName; // Muestra la ruta seleccionada
            // Opcional: Habilitar Aceptar si ambas rutas están listas
            // btnAccept.enabled = (inputFolderPath !== null && exportFolderPath !== null);
        }
    };

    // --- Botón "Aceptar" ---
    var btnAccept = buttonGroup.add('button', undefined, 'Aceptar', { name: 'ok' });
    btnAccept.helpTip = 'Inicia el procesamiento con las rutas seleccionadas.';
    // btnAccept.enabled = false; // Deshabilitado inicialmente hasta que se seleccionen las rutas

    // Acción al hacer clic en "Aceptar" (se ejecuta si show() devuelve 1)
    btnAccept.onClick = function() {
        if (inputFolderPath === null || exportFolderPath === null) {
            alert('Por favor, selecciona ambas rutas antes de continuar.');
            // No cerramos la ventana si faltan rutas
        } else {
            dialog.close(1); // Cierra la ventana y devuelve 1 (OK)
        }
    };

    // --- Botón "Cancelar" (Buena práctica añadirlo) ---
    var btnCancel = buttonGroup.add('button', undefined, 'Cancelar', { name: 'cancel' });
    btnCancel.helpTip = 'Cierra el script sin hacer nada.';

    // Acción al hacer clic en "Cancelar" (ScriptUI lo maneja automáticamente devolviendo 2)
    btnCancel.onClick = function() {
        dialog.close(2); // Cierra la ventana y devuelve 2 (Cancel)
    };

    // --- Mostrar la ventana ---
    var dialogResult = dialog.show();

    // --- Procesamiento después de cerrar la ventana ---
    if (dialogResult === 1) { // Si el usuario hizo clic en "Aceptar" y las rutas son válidas
        // --- Preparación para el procesamiento ---
        var originalRulerUnits = preferences.rulerUnits;
        preferences.rulerUnits = Units.PIXELS; // Usar píxeles para cálculos precisos

        // --- Aquí iría el código principal de tu script ---
        // Utiliza las variables inputFolderPath y exportFolderPath
        alert('Script iniciado.\nCarpeta de entrada: ' + inputFolderPath.fsName + '\nCarpeta de exportación: ' + exportFolderPath.fsName);
        
        // --- Inicio del procesamiento de archivos ---
        
        // 1. Buscar archivos .psd en la carpeta de entrada
        var fileList = inputFolderPath.getFiles(/\.(psd)$/i); // Obtener solo archivos PSD (case-insensitive)
        
        if (fileList.length > 0) {
            alert('Se encontraron ' + fileList.length + ' archivos PSD. Iniciando exportación...');
            
            for (var i = 0; i < fileList.length; i++) {
                var currentFile = fileList[i];
                if (currentFile instanceof File) { // Asegurarse de que es un archivo
                    try {
                        // 2. Abrir el archivo PSD
                        var doc = open(currentFile);

                        // --- 2.1 Verificar y Desagrupar Mesas de Trabajo si existen ---
                        if (doc.artboards && doc.artboards.length > 0) {
                            alert("Se detectaron " + doc.artboards.length + " Mesas de Trabajo en '" + doc.name + "'.\nIntentando convertir a grupos...");
                            try {
                                // Usar Action Manager para convertir mesas de trabajo a grupos
                                function convertArtboardsToGroups() {
                                    var desc = new ActionDescriptor();
                                    var ref = new ActionReference();
                                    // Referencia al documento actual
                                    ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
                                    desc.putReference( charIDToTypeID('null'), ref );
                                    // Ejecutar la acción 'convertArtboardToGroup'
                                    executeAction( stringIDToTypeID( "convertArtboardToGroup" ), desc, DialogModes.NO );
                                }
                                convertArtboardsToGroups();
                                alert("Mesas de trabajo convertidas exitosamente.");
                            } catch (ungroupError) {
                                alert("Error al intentar convertir las mesas de trabajo en '" + doc.name + "'.\n" + ungroupError.message + "\nEl script continuará, pero el resultado puede no ser el esperado.");
                                // Considerar si detener el script aquí o continuar
                            }
                        }

                        var docName = doc.name; // Guardar nombre original
                        var baseName = docName.replace(/\.[^\.]+$/, ''); // Nombre sin extensión
                        var originalWidth = doc.width;
                        var originalHeight = doc.height;
                        var initialState = doc.activeHistoryState; // Guardar estado inicial para revertir
                        
                        // --- 3. Exportar Imagen Completa ---
                        var saveOptions = new JPEGSaveOptions();
                        saveOptions.quality = 12; // Máxima calidad
                        
                        var saveFileFull = new File(exportFolderPath.fsName + '/' + baseName + '.jpg');
                        doc.saveAs(saveFileFull, saveOptions, true, Extension.LOWERCASE); // true = guardar como copia

                        // --- 4. Recortar y Exportar Mitad Izquierda ---
                        // Coordenadas: [izquierda, arriba, derecha, abajo]
                        var leftBounds = [0, 0, originalWidth / 2, originalHeight];
                        doc.crop(leftBounds);
                        
                        var saveFileLeft = new File(exportFolderPath.fsName + '/' + baseName + '_1.jpg');
                        // Reutilizamos saveOptions (máxima calidad)
                        doc.saveAs(saveFileLeft, saveOptions, true, Extension.LOWERCASE);
                        
                        // --- 5. Revertir al estado original ---
                        doc.activeHistoryState = initialState; // Volver al estado antes del recorte

                        // --- 6. Recortar y Exportar Mitad Derecha ---
                        var rightBounds = [originalWidth / 2, 0, originalWidth, originalHeight];
                        doc.crop(rightBounds);

                        var saveFileRight = new File(exportFolderPath.fsName + '/' + baseName + '_2.jpg');
                        // Reutilizamos saveOptions (máxima calidad)
                        doc.saveAs(saveFileRight, saveOptions, true, Extension.LOWERCASE);

                        // --- 7. Cerrar el archivo PSD sin guardar cambios ---
                        // No es necesario revertir de nuevo, ya que cerramos sin guardar.
                        doc.close(SaveOptions.DONOTSAVECHANGES); 
                        
                    } catch (e) {
                        alert("Error procesando el archivo: " + (currentFile ? currentFile.name : "desconocido") + "\nError: " + e.message + "\nLínea: " + e.line + "\nEl script continuará con el siguiente archivo si es posible.");
                        // Opcional: decidir si continuar con el siguiente archivo o detener el script
                        // if (doc) { doc.close(SaveOptions.DONOTSAVECHANGES); } // Intentar cerrar si quedó abierto
                    }
                }
            }
            alert('Proceso completado para ' + fileList.length + ' archivos.');
        } else {
            alert('No se encontraron archivos .psd en la carpeta de entrada:\n' + inputFolderPath.fsName);
        }

        // Restaurar unidades originales
        preferences.rulerUnits = originalRulerUnits;

    } else {
        alert('Script cancelado por el usuario.');
    }
}

// Llama a la función principal para ejecutar el script
main();

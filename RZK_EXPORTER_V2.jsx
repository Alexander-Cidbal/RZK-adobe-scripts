#target photoshop

function main() {
    // Variables para almacenar las rutas seleccionadas
    var inputFolderPath = null;
    var exportFolderPath = null;

    // Ventana principal
    var dlg = new Window('dialog', 'RZK Exporter v2.0');
    dlg.orientation = 'column';
    dlg.preferredSize.width = 500; // Aumentar ancho para rutas largas
    dlg.alignChildren = 'fill';
    dlg.graphics.backgroundColor = dlg.graphics.newBrush(dlg.graphics.BrushType.SOLID_COLOR, [0.12,0.12,0.12]);

    // --- Texto superior ---
    var title = dlg.add('statictext', undefined, '.:_RZK EXPORTER_2.0_:.');
    title.graphics.font = ScriptUI.newFont("Arial", "BOLD", 28);
    title.alignment = 'center';
    title.margins = [10, 10, 10, 10];
    //title.graphics.foregroundColor = title.graphics.newPen(ScriptUI.PenType.SOLID_COLOR, [1,1,1], 1);
    title.graphics.foregroundColor = title.graphics.newPen (title.graphics.PenType.SOLID_COLOR, [0.7, 1, 0.3], 150);

    var title = dlg.add('statictext', undefined, 'Exportador de archivos PSD a JPG, enteros y por mitades.');
    title.graphics.font = ScriptUI.newFont("Arial", "REGULAR", 12);
    title.alignment = 'center';
    title.margins = [10, 10, 10, 50];

// --- Línea divisoria 0 ---
    var sep0 = dlg.add('panel', undefined, undefined, {borderStyle:'black'});
    sep0.alignment = 'fill';
    sep0.minimumSize.height = 3;
    //sep0.graphics.backgroundColor = sep1.graphics.newBrush(ScriptUI.BrushType.SOLID_COLOR, [0,0,0]);


    // --- Bloque 1 ---
    var block1 = dlg.add('group');
    block1.orientation = 'row';
    block1.alignChildren = ['top', 'left'];
    block1.alignment = 'left';
    block1.margins = [10,0,0,0]; // Margen izquierdo de 10 para alinear con el título

    var num1 = block1.add('statictext', undefined, '1');
    num1.graphics.font = ScriptUI.newFont("Arial", "BOLD", 48);
    //num1.graphics.foregroundColor = num1.graphics.newPen(ScriptUI.PenType.SOLID_COLOR, [1,1,1], 1);
    num1.size = [40, 50];
    num1.graphics.foregroundColor = num1.graphics.newPen (num1.graphics.PenType.SOLID_COLOR, [0.4, 0.8, 0.1], 6);


    var block1content = block1.add('group');
    block1content.orientation = 'column';
    block1content.alignChildren = 'left';
    block1content.margins = [10,0,0,0];

    block1content.add('statictext', undefined, 'Seleccionar carpeta con las imágenes a procesar');
    var row1 = block1content.add('group');
    row1.orientation = 'row';
    row1.alignChildren = ['left', 'center'];
    var btnInput = row1.add('button', undefined, 'Seleccionar carpeta');
    
    var inputLabel = row1.add('statictext', undefined, '   Ninguna carpeta seleccionada', {truncate: 'middle'});
    inputLabel.preferredSize.width = 300;

    btnInput.onClick = function() {
        var folder = Folder.selectDialog('Selecciona la carpeta de entrada con los PSDs');
        if (folder) {
            inputFolderPath = folder;
            inputLabel.text = '   ' + folder.fsName;
        } else {
            // inputFolderPath = null; // Opcional: resetear si cancela
            // inputLabel.text = '   Ninguna carpeta seleccionada';
        }
    };

    // --- Línea divisoria 1 ---
    var sep1 = dlg.add('panel', undefined, undefined, {borderStyle:'black'});
    sep1.alignment = 'fill';
    sep1.minimumSize.height = 3;
    //sep1.graphics.backgroundColor = sep1.graphics.newBrush(ScriptUI.BrushType.SOLID_COLOR, [0,0,0]);

    // --- Bloque 2 ---
    var block2 = dlg.add('group');
    block2.orientation = 'row';
    block2.alignChildren = ['top', 'left'];
    block2.alignment = 'left';
    block2.margins = [10,0,0,0]; // Margen izquierdo de 10 para alinear con el título

    var num2 = block2.add('statictext', undefined, '2');
    num2.graphics.font = ScriptUI.newFont("Arial", "BOLD", 48);
    //num2.graphics.foregroundColor = num2.graphics.newPen(ScriptUI.PenType.SOLID_COLOR, [1,1,1], 1);
    num2.size = [40, 50];
    num2.graphics.foregroundColor = num2.graphics.newPen (num2.graphics.PenType.SOLID_COLOR, [0.4, 0.8, 0.1], 6);


    var block2content = block2.add('group');
    block2content.orientation = 'column';
    block2content.alignChildren = 'left';
    block2content.margins = [10,0,0,0];

    block2content.add('statictext', undefined, 'Seleccionar carpeta para guardar las imágenes procesadas');
    var row2 = block2content.add('group');
    row2.orientation = 'row';
    row2.alignChildren = ['left', 'center'];
    var btnOutput = row2.add('button', undefined, 'Seleccionar carpeta');
    var outputLabel = row2.add('statictext', undefined, '   Ninguna carpeta seleccionada', {truncate: 'middle'});
    outputLabel.preferredSize.width = 300;

    btnOutput.onClick = function() {
        var folder = Folder.selectDialog('Selecciona la carpeta de exportación');
        if (folder) {
            exportFolderPath = folder;
            outputLabel.text = '   ' + folder.fsName;
        } else {
            // exportFolderPath = null; // Opcional: resetear si cancela
            // outputLabel.text = '   Ninguna carpeta seleccionada';
        }
    };

    // --- Línea divisoria 2 ---
    var sep2 = dlg.add('panel', undefined, undefined, {borderStyle:'black'});
    sep2.alignment = 'fill';
    sep2.minimumSize.height = 3;
    //sep2.graphics.foregroundColor = sep2.graphics.newBrush(sep3.graphics.SOLID_COLOR, [0,0,0]);

    // --- Bloque 3 ---
    var block3 = dlg.add('group');
    block3.orientation = 'row';
    block3.alignChildren = ['top', 'left'];
    block3.alignment = 'left';
    block3.margins = [10,0,0,0]; // Margen izquierdo de 10 para alinear con el título

    var num3 = block3.add('statictext', undefined, '3');
    num3.graphics.font = ScriptUI.newFont("Arial", "BOLD", 48);
    //num3.graphics.foregroundColor = num3.graphics.newPen(ScriptUI.PenType.SOLID_COLOR, [1,1,1], 1);
    num3.size = [40, 50];
    num3.graphics.foregroundColor = num3.graphics.newPen (num3.graphics.PenType.SOLID_COLOR, [0.4, 0.8, 0.1], 6);

    var block3content = block3.add('group');
    block3content.orientation = 'column';
    block3content.alignChildren = 'left';
    block3content.margins = [10,0,0,0];

    block3content.add('statictext', undefined, 'Ajustes de exportación');

    // Aquí los radio buttons y el campo calidad están alineados igual que en los otros bloques
    var radio1 = block3content.add('radiobutton', undefined, 'Exportar imagen completa');
    var radio2 = block3content.add('radiobutton', undefined, 'Exportar mitades');
    var radio3 = block3content.add('radiobutton', undefined, 'Exportar ambas');
    radio3.value = true;

    var qualityGroup = block3content.add('group');
    qualityGroup.orientation = 'row';
    qualityGroup.add('statictext', undefined, 'Calidad:');
    var qualityInput = qualityGroup.add('edittext', undefined, '12');
    qualityInput.preferredSize.width = 40;
    qualityInput.characters = 3;

    // --- Línea divisoria 3 ---
    var sep3 = dlg.add('panel', undefined, undefined, {borderStyle:'black'});
    sep3.alignment = 'fill';
    sep3.minimumSize.height = 3;
    //sep3.graphics.backgroundColor = sep3.graphics.newBrush(ScriptUI.BrushType.SOLID_COLOR, [0,0,0]);

    // --- Botones inferiores ---
    var btns = dlg.add('group');
    btns.orientation = 'row';
    btns.alignment = 'center';
    btns.margins = [0,10,0,10];

    var btnRun = btns.add('button', undefined, 'Ejecutar');
    btnRun.preferredSize.width = 100;
    var btnCancel = btns.add('button', undefined, 'Cancelar');
    btnCancel.preferredSize.width = 100;
    var btnInfo = btns.add('button', undefined, 'Info');
    btnInfo.preferredSize.width = 80; // Ajustar ancho para dar espacio al nuevo botón
    var btnWeb = btns.add('button', undefined, '🌐 Web'); // O puedes usar "Web" o "Google"
    btnWeb.preferredSize.width = 80; // Ajustar ancho

    // Eventos básicos de cierre
    btnWeb.onClick = function() {
        var targetURL = "https://github.com/Alexander-Cidbal/RZK-adobe-scripts";
        try {
            if ($.os.indexOf("Windows") !== -1) {
                // En Windows, usar cmd.exe con el comando 'start' es más fiable.
                // El comando 'start "" "URL"' asegura que la URL se maneje correctamente.
                var command = 'cmd /c start "" "' + targetURL + '"';
                app.system(command);
            } else {
                // En macOS y otros, File.execute() suele funcionar bien para URLs.
                var urlFile = new File(targetURL);
                urlFile.execute();
            }
        } catch (e) {
            alert("No se pudo abrir el navegador web.\nURL: " + targetURL + "\nError: " + e.message + "\nOS: " + $.os);
        }
    };
    btnCancel.onClick = function() { dlg.close(); };
    btnInfo.onClick = function() {
        alert('RZK Exporter v2.0\nScript por .:_RZK_:.\n\nEste script exporta archivos PSD a JPG.\n' +
              '- Permite exportar la imagen completa, por mitades (izquierda/derecha), o ambas.\n' +
              '- Convierte Mesas de Trabajo a grupos antes de procesar.\n' +
              '- Permite seleccionar la calidad JPEG (0-12).');
    };

    // --- Función para convertir Mesas de Trabajo a Grupos (de Export_filesmine.jsx) ---
    function convertArtboardsToGroupsInternal() {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        desc.putReference( charIDToTypeID('null'), ref );
        executeAction( stringIDToTypeID( "convertArtboardToGroup" ), desc, DialogModes.NO );
    }

    btnRun.onClick = function() {
        if (inputFolderPath === null || exportFolderPath === null) {
            alert('Por favor, selecciona la carpeta de entrada y la carpeta de exportación antes de continuar.');
            return;
        }

        var exportOption = "both"; // Default
        if (radio1.value) { exportOption = "full"; }
        else if (radio2.value) { exportOption = "halves"; }
        else if (radio3.value) { exportOption = "both"; }

        var jpegQuality = parseInt(qualityInput.text);
        if (isNaN(jpegQuality) || jpegQuality < 0 || jpegQuality > 12) {
            alert('La calidad debe ser un número entre 0 y 12. Se usará 12 por defecto.');
            jpegQuality = 12;
        }

        // --- Inicio del procesamiento (adaptado de Export_filesmine.jsx) ---
        var originalRulerUnits = preferences.rulerUnits;
        preferences.rulerUnits = Units.PIXELS;

        var joinFolderPath = null;
        var dividedFolderPath = null;

        if (exportOption === "full" || exportOption === "both") {
            joinFolderPath = new Folder(exportFolderPath.fsName + "/Join");
            if (!joinFolderPath.exists) {
                if (!joinFolderPath.create()) {
                    alert("Error: No se pudo crear la carpeta 'Join' en:\n" + joinFolderPath.fsName + "\nEl script se detendrá.");
                    preferences.rulerUnits = originalRulerUnits;
                    return;
                }
            }
        }
        if (exportOption === "halves" || exportOption === "both") {
            dividedFolderPath = new Folder(exportFolderPath.fsName + "/Divided");
            if (!dividedFolderPath.exists) {
                if (!dividedFolderPath.create()) {
                    alert("Error: No se pudo crear la carpeta 'Divided' en:\n" + dividedFolderPath.fsName + "\nEl script se detendrá.");
                    preferences.rulerUnits = originalRulerUnits;
                    return;
                }
            }
        }

        alert('Script iniciado.\nCarpeta de entrada: ' + inputFolderPath.fsName +
              '\nCarpeta de exportación principal: ' + exportFolderPath.fsName +
              "\nOpción de exportación: " + exportOption +
              "\nCalidad JPEG: " + jpegQuality);

        var fileList = inputFolderPath.getFiles(/\.(psd)$/i);

        if (fileList.length > 0) {
            alert('Se encontraron ' + fileList.length + ' archivos PSD. Iniciando exportación...');
            var processedCount = 0;

            for (var i = 0; i < fileList.length; i++) {
                var currentFile = fileList[i];
                if (currentFile instanceof File) {
                    var doc = null; // Declarar doc fuera del try para poder cerrarlo en catch
                    try {
                        doc = open(currentFile);

                        if (doc.artboards && doc.artboards.length > 0) {
                            // alert("Se detectaron " + doc.artboards.length + " Mesas de Trabajo en '" + doc.name + "'. Convirtiendo a grupos...");
                            try {
                                convertArtboardsToGroupsInternal();
                                // alert("Mesas de trabajo convertidas exitosamente en '" + doc.name + "'.");
                            } catch (ungroupError) {
                                alert("Advertencia: Error al intentar convertir las mesas de trabajo en '" + doc.name + "'.\n" + ungroupError.message + "\nEl script continuará, pero el resultado puede no ser el esperado.");
                            }
                        }

                        var docName = doc.name;
                        var baseName = docName.replace(/\.[^\.]+$/, '');
                        var originalWidth = doc.width.as('px'); // Asegurar pixeles
                        var originalHeight = doc.height.as('px'); // Asegurar pixeles
                        var initialState = doc.activeHistoryState;

                        var saveOptions = new JPEGSaveOptions();
                        saveOptions.quality = jpegQuality;

                        if (exportOption === "full" || exportOption === "both") {
                            var saveFileFull = new File(joinFolderPath.fsName + '/' + baseName + '.jpg');
                            doc.saveAs(saveFileFull, saveOptions, true, Extension.LOWERCASE);
                        }

                        if (exportOption === "halves" || exportOption === "both") {
                            // Mitad Izquierda
                            var leftBounds = [0, 0, originalWidth / 2, originalHeight];
                            doc.crop(leftBounds);
                            var saveFileLeft = new File(dividedFolderPath.fsName + '/' + baseName + '_1.jpg');
                            doc.saveAs(saveFileLeft, saveOptions, true, Extension.LOWERCASE);
                            doc.activeHistoryState = initialState; // Revertir para la mitad derecha

                            // Mitad Derecha
                            var rightBounds = [originalWidth / 2, 0, originalWidth, originalHeight];
                            doc.crop(rightBounds);
                            var saveFileRight = new File(dividedFolderPath.fsName + '/' + baseName + '_2.jpg');
                            doc.saveAs(saveFileRight, saveOptions, true, Extension.LOWERCASE);
                            // No es necesario revertir aquí si cerramos sin guardar
                        }

                        doc.close(SaveOptions.DONOTSAVECHANGES);
                        doc = null; // Marcar como cerrado
                        processedCount++;

                    } catch (e) {
                        alert("Error procesando el archivo: " + (currentFile ? currentFile.name : "desconocido") +
                              "\nError: " + e.message + (e.line ? ("\nLínea: " + e.line) : "") +
                              "\nEl script continuará con el siguiente archivo si es posible.");
                        if (doc) { // Intentar cerrar si quedó abierto
                            try { doc.close(SaveOptions.DONOTSAVECHANGES); } catch (closeError) {}
                        }
                    }
                }
            }
            alert('Proceso completado.\nSe procesaron ' + processedCount + ' de ' + fileList.length + ' archivos.\nScript por .:_RZK_:.');
        } else {
            alert('No se encontraron archivos .psd en la carpeta de entrada:\n' + inputFolderPath.fsName);
        }

        preferences.rulerUnits = originalRulerUnits;
        dlg.close(); // Cerrar el diálogo después de procesar
    };

    dlg.center();
    dlg.show();
}

main();

// Nota: La función convertArtboardsToGroupsInternal se ha movido dentro de main()
// para mantenerla encapsulada y evitar conflictos si este script se combina con otros.
// Si prefieres, puede ser una función global.
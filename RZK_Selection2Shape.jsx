#target photoshop
var dlg = new Window('dialog', 'RZK_SELECTION2SHAPE_1.0');
dlg.orientation = 'column';
dlg.preferredSize.width = 500;
dlg.alignChildren = 'fill';
// Opcional: Color de fondo para el diálogo principal, si quieres que coincida
dlg.graphics.backgroundColor = dlg.graphics.newBrush(dlg.graphics.BrushType.SOLID_COLOR, [0.12,0.12,0.12]);

// --- INICIO: Panel Superior Copiado de RZK_EXPORTER_M_V2.jsx ---

// --- Barra de Título (Contenedor para el título principal y el icono de GitHub) ---
var titleBarGroup = dlg.add('group');
titleBarGroup.orientation = 'stack'; // Usar 'stack' para superponer y alinear independientemente
titleBarGroup.alignment = 'fill';    // La barra de título ocupa todo el ancho
titleBarGroup.margins = [10, 10, 5, 10]; // Arriba:10, Izquierda:10, Abajo:5, Derecha:10

// --- Texto del Título Principal ---
var mainTitleText = titleBarGroup.add('statictext', undefined, '.:_RZK_SELECTION2SHAPE_1.0_:.');
mainTitleText.graphics.font = ScriptUI.newFont("Agency FB", "BOLD", 48);
mainTitleText.alignment = ['center', 'center']; // Centra el texto horizontal y verticalmente en el 'stack'
mainTitleText.graphics.foregroundColor = mainTitleText.graphics.newPen (mainTitleText.graphics.PenType.SOLID_COLOR, [0.7, 1, 0.3], 1);

// --- Botón de Icono GitHub ---
// Asegúrate de que el archivo "github_logo.png" esté en la misma carpeta que tu script,
// o ajusta la ruta según sea necesario.
var githubIconFileName = "github_logo.png"; 
var githubIconPath = new File($.fileName).parent.fsName + "/" + githubIconFileName;
var githubIconFile = new File(githubIconPath);

if (githubIconFile.exists) {
    var githubButton = titleBarGroup.add('iconbutton', undefined, githubIconFile, {style: 'toolbutton'});
    githubButton.helpTip = "Visitar Repositorio en GitHub";
    githubButton.preferredSize = [28, 28]; // Tamaño del botón
    githubButton.alignment = ['right', 'center']; // Alinear a la derecha y centrado verticalmente en el 'stack'
    githubButton.onClick = function() {
        var targetURL = "https://github.com/Alexander-Cidbal/RZK-adobe-scripts"; // URL del repositorio
        try {
            if ($.os.indexOf("Windows") !== -1) {
                app.system('cmd /c start "" "' + targetURL + '"');
            } else { // macOS u otros Unix-like
                app.system('open "' + targetURL + '"');
            }
        } catch (e) {
            alert("No se pudo abrir el navegador web.\nURL: " + targetURL + "\nError: " + e.message);
        }
    };
}

// --- Subtítulo ---
var subTitleText = dlg.add('statictext', undefined, 'Exportador de archivos PSD a JPG, enteros y por mitades.');
subTitleText.graphics.font = ScriptUI.newFont("Arial", "REGULAR", 12);
subTitleText.alignment = 'center'; // Centrado horizontalmente en el diálogo
subTitleText.margins = [5, 10, 10, 50]; // Arriba:5 (desde titleBarGroup), Izquierda:10, Abajo:10, Derecha:50 (original de RZK_EXPORTER_M_V2)
subTitleText.graphics.foregroundColor = subTitleText.graphics.newPen (subTitleText.graphics.PenType.SOLID_COLOR, [0.84, 1, 0.63], 1);

// --- Línea divisoria 0 ---
var sep0 = dlg.add('panel', undefined, undefined, {borderStyle:'black'});
sep0.alignment = 'fill';
sep0.minimumSize.height = 3;
sep0.graphics.backgroundColor = sep0.graphics.newBrush(sep0.graphics.BrushType.SOLID_COLOR, [0,0,0]);

// --- FIN: Panel Superior Copiado ---

// Añadir un botón simple para cerrar el diálogo y permitir que el script continúe
var continueButton = dlg.add('button', undefined, 'Convertir Selección a Forma');
continueButton.alignment = 'center';
continueButton.margins = [0,15,0,15]; // Añadir un poco de margen vertical
continueButton.onClick = function() {
    dlg.close(); // Cierra el diálogo, la ejecución continuará con la IIFE de abajo
};

dlg.center();
dlg.show(); // Mostrar el diálogo. La ejecución se detiene aquí hasta que se cierre.

// Envolver el script en una función para evitar conflictos de variables globales
(function() {

    // Función principal para convertir la selección en forma
    function selectionToShape() {
        // Verificar si hay un documento abierto
        if (app.documents.length === 0) {
            alert("Por favor, abre un documento primero.");
            return;
        }

        var doc = app.activeDocument;

        // 1. Evaluar si hay una selección activa
        var selectionActive = false;
        try {
            // Intentar acceder a los límites de la selección.
            // Esto generará un error si no hay ninguna selección de píxeles.
            var selBounds = doc.selection.bounds;
            // Opcionalmente, se podría verificar aquí si la selección tiene un área mínima,
            // pero makeWorkPath o la creación de la capa de relleno deberían manejar selecciones degeneradas.
            // Si la línea anterior no generó error, hay una selección.
            selectionActive = true;
        } catch (e) {
            // Un error aquí significa que no hay selección activa.
            selectionActive = false;
        }

        // 2. Si no hay selección, lanzar una advertencia y detener el script
        if (!selectionActive) {
            alert("Selección no encontrada. Por favor, realiza una selección");
            return;
        }

        // 3. Si hay una selección activa, convertirla en una forma
        try {
            // Guardar las unidades de regla actuales y establecerlas en píxeles para resultados predecibles
            var originalRulerUnits = app.preferences.rulerUnits;
            app.preferences.rulerUnits = Units.PIXELS;

            // a. Convertir la selección en un trazado de trabajo (Work Path)
            // Tolerancia: Un valor entre 0.5 y 10 píxeles.
            // Valores más bajos crean más puntos de anclaje y siguen la selección más de cerca.
            // Usaremos 2.0 para un trazado ligeramente suavizado.
            var tolerance = 2.0; 
            doc.selection.makeWorkPath(tolerance);

            // b. Crear una nueva capa de Relleno de Color Sólido (esta será nuestra capa de forma)
            // Esta capa usará automáticamente el trazado de trabajo activo como su máscara vectorial.
            // Relleno blanco (R:255, G:255, B:255)
            createSolidFillLayer(255, 255, 255);

            // c. La nueva capa de relleno es ahora la capa activa. Añadir un trazo negro.
            var strokeColor = new SolidColor();
            strokeColor.rgb.red = 0;
            strokeColor.rgb.green = 0;
            strokeColor.rgb.blue = 0;
            
            var strokeSize = 3; // Tamaño del trazo en píxeles (puedes ajustarlo)
            var strokePosition = "strokeStyleOutside"; // Posición del trazo: "strokeStyleOutside", "strokeStyleInside", "strokeStyleCenter"
            
            addStrokeToActiveLayer(strokeSize, strokeColor, strokePosition);

            // d. Opcional: deseleccionar
            // doc.selection.deselect(); // Descomentar si quieres que la selección se elimine después

            // e. Opcional: eliminar el trazado de trabajo si ya no se necesita
            // if (doc.pathItems.length > 0 && doc.pathItems[doc.pathItems.length -1].kind == PathKind.WORKPATH) {
            //     doc.pathItems[doc.pathItems.length -1].remove();
            // }


            // Restaurar las unidades de regla originales
            app.preferences.rulerUnits = originalRulerUnits;

        } catch (e) {
            alert("Error al convertir la selección a forma: " + e.message);
            // Restaurar las unidades de regla originales en caso de error también
            if (typeof originalRulerUnits !== 'undefined') {
                app.preferences.rulerUnits = originalRulerUnits;
            }
        }
    }

    // Función auxiliar para crear una Capa de Relleno de Color Sólido
    function createSolidFillLayer(r, g, b) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass(stringIDToTypeID("contentLayer"));
        desc.putReference(stringIDToTypeID("null"), ref);
        
        var typeDesc = new ActionDescriptor();
        var colorDesc = new ActionDescriptor();
        var rgbDesc = new ActionDescriptor();
        rgbDesc.putDouble(stringIDToTypeID("red"), r);
        rgbDesc.putDouble(stringIDToTypeID("green"), g);
        rgbDesc.putDouble(stringIDToTypeID("blue"), b);
        colorDesc.putObject(stringIDToTypeID("color"), stringIDToTypeID("RGBColor"), rgbDesc);
        typeDesc.putObject(stringIDToTypeID("type"), stringIDToTypeID("solidColorLayer"), colorDesc);
        
        desc.putObject(stringIDToTypeID("using"), stringIDToTypeID("contentLayer"), typeDesc);
        executeAction(stringIDToTypeID("make"), desc, DialogModes.NO);
    }

    // Función auxiliar para añadir un estilo de capa de Trazo a la capa activa
    function addStrokeToActiveLayer(size, color, position) {
        // position puede ser: "strokeStyleOutside", "strokeStyleInside", "strokeStyleCenter"
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt')); // Apuntar a la capa actual
        desc.putReference(charIDToTypeID('null'), ref);

        var layerEffectsDesc = new ActionDescriptor();
        var strokeDesc = new ActionDescriptor();

        strokeDesc.putBoolean(stringIDToTypeID('enabled'), true);
        strokeDesc.putBoolean(stringIDToTypeID('present'), true);
        strokeDesc.putBoolean(stringIDToTypeID('showInDialog'), false); // No mostrar diálogo para este efecto
        
        strokeDesc.putEnumerated(stringIDToTypeID('style'), stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyleLineTypeSolid')); // Estilo de línea sólida
        strokeDesc.putEnumerated(stringIDToTypeID('paintType'), stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyleContentSolidColor')); // Tipo de pintura: Color sólido
        
        var strokeColorDesc = new ActionDescriptor();
        strokeColorDesc.putDouble(charIDToTypeID('Rd  '), color.rgb.red);
        strokeColorDesc.putDouble(charIDToTypeID('Grn '), color.rgb.green);
        strokeColorDesc.putDouble(charIDToTypeID('Bl  '), color.rgb.blue);
        strokeDesc.putObject(charIDToTypeID('Clr '), charIDToTypeID('RGBC'), strokeColorDesc); // Color del trazo
        
        strokeDesc.putUnitDouble(stringIDToTypeID('size'), stringIDToTypeID('pixelsUnit'), size); // Tamaño del trazo
        strokeDesc.putEnumerated(stringIDToTypeID('position'), stringIDToTypeID('strokeStyle'), stringIDToTypeID(position)); // Posición del trazo
        strokeDesc.putUnitDouble(stringIDToTypeID('opacity'), stringIDToTypeID('percentUnit'), 100.0); // Opacidad del trazo (0-100)
        strokeDesc.putEnumerated(stringIDToTypeID("blendMode"), charIDToTypeID("BlnM"), charIDToTypeID("Nrml")); // Modo de fusión: Normal

        layerEffectsDesc.putObject(stringIDToTypeID('frameFX'), stringIDToTypeID('frameFX'), strokeDesc); // frameFX es el Trazo
        desc.putObject(charIDToTypeID('T   '), stringIDToTypeID('layerEffects'), layerEffectsDesc);
        
        executeAction(charIDToTypeID('setd'), desc, DialogModes.NO);
    }

    // Ejecutar la función principal
    selectionToShape();

})();

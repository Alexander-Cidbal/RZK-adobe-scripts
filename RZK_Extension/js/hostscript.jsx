/*
    hostscript.jsx
    Este archivo contiene la lógica de ExtendScript que interactúa con Photoshop.
    Será llamado desde main.js (el JavaScript del panel CEP).
*/

// Envolver el script en una función para evitar conflictos de variables globales
// y para que sea fácilmente invocable desde el panel.
function selectionToShapeMain() {
    try {
        // Verificar si hay un documento abierto
        if (app.documents.length === 0) {
            alert("Por favor, abre un documento primero.");
            return "Error: No document open.";
        }

        var doc = app.activeDocument;

        // 1. Evaluar si hay una selección activa
        var selectionActive = false;
        try {
            var selBounds = doc.selection.bounds;
            selectionActive = true;
        } catch (e) {
            selectionActive = false;
        }

        // 2. Si no hay selección, lanzar una advertencia y detener el script
        if (!selectionActive) {
            alert("Selección no encontrada. Por favor, realiza una selección");
            return "Error: No selection found.";
        }

        // 3. Si hay una selección activa, convertirla en una forma
        var originalRulerUnits; // Declarar fuera para que esté disponible en el catch
        try {
            // Guardar las unidades de regla actuales y establecerlas en píxeles
            originalRulerUnits = app.preferences.rulerUnits;
            app.preferences.rulerUnits = Units.PIXELS;

            var tolerance = 2.0; 
            doc.selection.makeWorkPath(tolerance);

            createSolidFillLayer(255, 255, 255); // Relleno blanco

            var strokeColor = new SolidColor();
            strokeColor.rgb.red = 0;
            strokeColor.rgb.green = 0;
            strokeColor.rgb.blue = 0;
            
            var strokeSize = 3; 
            var strokePosition = "strokeStyleOutside"; 
            
            addStrokeToActiveLayer(strokeSize, strokeColor, strokePosition);

            // Opcional: deseleccionar
            // doc.selection.deselect();

            // Opcional: eliminar el trazado de trabajo
            // if (doc.pathItems.length > 0 && doc.pathItems[doc.pathItems.length -1].kind == PathKind.WORKPATH) {
            //     doc.pathItems[doc.pathItems.length -1].remove();
            // }

            app.preferences.rulerUnits = originalRulerUnits;
            return "Success: Selection converted to shape.";

        } catch (e) {
            alert("Error al convertir la selección a forma: " + e.message);
            if (typeof originalRulerUnits !== 'undefined') {
                app.preferences.rulerUnits = originalRulerUnits;
            }
            return "Error: " + e.message;
        }
    } catch (err) {
        alert("Error general en hostscript: " + err.message);
        return "General error: " + err.message;
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
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc.putReference(charIDToTypeID('null'), ref);
    var layerEffectsDesc = new ActionDescriptor();
    var strokeDesc = new ActionDescriptor();
    strokeDesc.putBoolean(stringIDToTypeID('enabled'), true);
    strokeDesc.putEnumerated(stringIDToTypeID('style'), stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyleLineTypeSolid'));
    strokeDesc.putEnumerated(stringIDToTypeID('paintType'), stringIDToTypeID('strokeStyle'), stringIDToTypeID('strokeStyleContentSolidColor'));
    var strokeColorDesc = new ActionDescriptor();
    strokeColorDesc.putDouble(charIDToTypeID('Rd  '), color.rgb.red);
    strokeColorDesc.putDouble(charIDToTypeID('Grn '), color.rgb.green);
    strokeColorDesc.putDouble(charIDToTypeID('Bl  '), color.rgb.blue);
    strokeDesc.putObject(charIDToTypeID('Clr '), charIDToTypeID('RGBC'), strokeColorDesc);
    strokeDesc.putUnitDouble(stringIDToTypeID('size'), stringIDToTypeID('pixelsUnit'), size);
    strokeDesc.putEnumerated(stringIDToTypeID('position'), stringIDToTypeID('strokeStyle'), stringIDToTypeID(position));
    strokeDesc.putUnitDouble(stringIDToTypeID('opacity'), stringIDToTypeID('percentUnit'), 100.0);
    strokeDesc.putEnumerated(stringIDToTypeID("blendMode"), charIDToTypeID("BlnM"), charIDToTypeID("Nrml"));
    layerEffectsDesc.putObject(stringIDToTypeID('frameFX'), stringIDToTypeID('frameFX'), strokeDesc);
    desc.putObject(charIDToTypeID('T   '), stringIDToTypeID('layerEffects'), layerEffectsDesc);
    executeAction(charIDToTypeID('setd'), desc, DialogModes.NO);
}
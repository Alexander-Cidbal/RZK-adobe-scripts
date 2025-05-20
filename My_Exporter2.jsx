#target photoshop

function main() {
    // Ventana principal
    var dlg = new Window('dialog', 'Exportador PSD a JPG');
    dlg.orientation = 'column';
    dlg.alignChildren = 'fill';
    dlg.graphics.backgroundColor = dlg.graphics.newBrush(dlg.graphics.BrushType.SOLID_COLOR, [0.15,0.15,0.15]);

    // --- Texto superior ---
    var title = dlg.add('statictext', undefined, '.:_RZK EXPORTER_:.');
    title.graphics.font = ScriptUI.newFont("Arial", "BOLD", 28);
    title.alignment = 'center';
    title.margins = [10, 10, 10, 10];
    //title.graphics.foregroundColor = title.graphics.newPen(ScriptUI.PenType.SOLID_COLOR, [1,1,1], 1);


    var title = dlg.add('statictext', undefined, 'Exportador de archivos PSD a JPG, enteros y por mitades.');
    title.graphics.font = ScriptUI.newFont("Arial", "REGULAR", 12);
    title.alignment = 'center';
    title.margins = [10, 10, 10, 50];



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

    var block1content = block1.add('group');
    block1content.orientation = 'column';
    block1content.alignChildren = 'left';
    block1content.margins = [10,0,0,0];

    block1content.add('statictext', undefined, 'Seleccionar carpeta con las imágenes a procesar');
    var row1 = block1content.add('group');
    row1.orientation = 'row';
    var btnInput = row1.add('button', undefined, 'Seleccionar carpeta');
    var inputLabel = row1.add('statictext', undefined, '   Carpeta seleccionada:');
    inputLabel.preferredSize.width = 180;

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

    var block2content = block2.add('group');
    block2content.orientation = 'column';
    block2content.alignChildren = 'left';
    block2content.margins = [10,0,0,0];

    block2content.add('statictext', undefined, 'Seleccionar carpeta para guardar las imágenes procesadas');
    var row2 = block2content.add('group');
    row2.orientation = 'row';
    var btnOutput = row2.add('button', undefined, 'Seleccionar carpeta');
    var outputLabel = row2.add('statictext', undefined, '   Carpeta seleccionada:');
    outputLabel.preferredSize.width = 180;

    // --- Línea divisoria 2 ---
    var sep2 = dlg.add('panel', undefined, undefined, {borderStyle:'black'});
    sep2.alignment = 'fill';
    sep2.minimumSize.height = 3;
    //sep2.graphics.backgroundColor = sep2.graphics.newBrush(ScriptUI.BrushType.SOLID_COLOR, [0,0,0]);

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
    var qualityInput = qualityGroup.add('edittext', undefined, '');
    qualityInput.preferredSize.width = 40;

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
    btnInfo.preferredSize.width = 100;

    // Eventos básicos de cierre
    btnCancel.onClick = function() { dlg.close(); };
    btnRun.onClick = function() { alert('Ejecutar'); };
    btnInfo.onClick = function() { alert('Información del script'); };

    dlg.center();
    dlg.show();
}

main();
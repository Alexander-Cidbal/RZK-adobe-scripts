(function () {
    'use strict';

    var csInterface = new CSInterface();

    function init() {
        var convertButton = document.getElementById('btnConvert');
        
        convertButton.addEventListener('click', function () {
            // Llama a la función 'convertSelectionToShape' en hostscript.jsx
            csInterface.evalScript('selectionToShapeMain()', function(result) {
                // 'result' es lo que devuelve la función de ExtendScript
                // Puedes usarlo para mostrar mensajes o errores en el panel HTML
                // Por ahora, no hacemos nada con el resultado.
            });
        });
    }

    init();
}());
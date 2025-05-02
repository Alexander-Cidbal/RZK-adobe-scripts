// Función principal para crear y mostrar la interfaz de usuario
function crearInterfazNombresTamaño() {

    // --- Creación de la Ventana Principal ---
    // new Window(tipo, titulo, [izquierda, arriba, derecha, abajo])
    // 'palette' crea una ventana flotante que no bloquea el resto de AE
    var ventana = new Window("palette", "RZK Batch crear comps", undefined);
    ventana.orientation = "column"; // Los elementos se apilarán verticalmente
    ventana.alignChildren = ["fill", "top"]; // Alinear elementos hijos para que llenen horizontalmente

    // --- Grupo para Nombres ---
    // Un grupo para mantener la etiqueta y el cuadro de texto juntos
    var grupoNombres = ventana.add("group", undefined, { orientation: "column", alignment: ["fill", "top"] });
    grupoNombres.alignChildren = ["left", "top"]; // Alinear etiqueta y texto a la izquierda/arriba
    grupoNombres.add("statictext", undefined, "Nombres:"); // Etiqueta estática
    // Cuadro de texto grande (EditText)
    // [x, y, ancho, alto], texto inicial, {opciones}
    // multiline: true permite múltiples líneas
    var inputNombres = grupoNombres.add("edittext", [0, 0, 350, 150], "", { multiline: true, name: "nombres" });
    inputNombres.helpTip = "Introduce los nombres aquí, uno por línea si es necesario."; // Texto de ayuda al pasar el ratón

    // --- Grupo para Tamaños (X e Y) ---
    // Un grupo principal para contener los dos subgrupos de tamaño, en fila
    var grupoTamaños = ventana.add("group", undefined, { orientation: "row", alignment: ["center", "top"] }); // Centrar este grupo horizontalmente

    // Subgrupo Tamaño X (Etiqueta + Input)
    var subGrupoTamX = grupoTamaños.add("group", undefined, { orientation: "column", alignment: ["left", "top"] });
    subGrupoTamX.add("statictext", undefined, "Tamaño X:");
    // Cuadro de texto pequeño para Tamaño X
    var inputTamX = subGrupoTamX.add("edittext", [0, 0, 60, 20], "", { name: "tamX" }); // Ancho 60, Alto 20
    inputTamX.helpTip = "Introduce el valor numérico para el tamaño horizontal.";

    // Subgrupo Tamaño Y (Etiqueta + Input)
    var subGrupoTamY = grupoTamaños.add("group", undefined, { orientation: "column", alignment: ["left", "top"] });
    subGrupoTamY.add("statictext", undefined, "Tamaño Y:");
    // Cuadro de texto pequeño para Tamaño Y
    var inputTamY = subGrupoTamY.add("edittext", [0, 0, 60, 20], "", { name: "tamY" }); // Ancho 60, Alto 20
    inputTamY.helpTip = "Introduce el valor numérico para el tamaño vertical.";

    // --- Grupo para Configuración de Composición (Duración y Frame Rate) ---
    var grupoConfigComp = ventana.add("group", undefined, { orientation: "row", alignment: ["center", "top"] });

    // Subgrupo Duración
    var subGrupoDuracion = grupoConfigComp.add("group", undefined, { orientation: "column", alignment: ["left", "top"] });
    subGrupoDuracion.add("statictext", undefined, "Duración (s):");
    var inputDuracion = subGrupoDuracion.add("edittext", [0, 0, 60, 20], "10", { name: "duracion" }); // Valor por defecto: 10 segundos
    inputDuracion.helpTip = "Introduce la duración de la composición en segundos.";

    // Subgrupo Frame Rate
    var subGrupoFrameRate = grupoConfigComp.add("group", undefined, { orientation: "column", alignment: ["left", "top"] });
    subGrupoFrameRate.add("statictext", undefined, "Frame Rate:");
    var inputFrameRate = subGrupoFrameRate.add("edittext", [0, 0, 60, 20], "30", { name: "frameRate" }); // Valor por defecto: 30 fps
    inputFrameRate.helpTip = "Introduce la tasa de fotogramas por segundo (FPS).";

    // --- Grupo para Botones ---
    // Un grupo para los botones, en fila y centrado
    var grupoBotones = ventana.add("group", undefined, { orientation: "row", alignment: ["center", "bottom"] });
    var botonAceptar = grupoBotones.add("button", undefined, "Aceptar", { name: "ok" });
    var botonCancelar = grupoBotones.add("button", undefined, "Cancelar", { name: "cancel" });

    // --- Lógica de los Botones ---

    // Acción al hacer clic en Aceptar
    botonAceptar.onClick = function() {
        // --- Obtener los valores de los cuadros de texto ---
        var nombres = inputNombres.text;
        var tamXStr = inputTamX.text;
        var tamYStr = inputTamY.text;
        var duracionStr = inputDuracion.text;
        var frameRateStr = inputFrameRate.text;

        // --- Validación de Entradas ---
        var tamX = parseInt(tamXStr); // Convertir a número entero
        var tamY = parseInt(tamYStr); // Convertir a número entero
        var duracionComp = parseFloat(duracionStr); // Convertir a número flotante (permite decimales)
        var frameRateComp = parseFloat(frameRateStr); // Convertir a número flotante

        if (isNaN(tamX) || isNaN(tamY) || tamX <= 0 || tamY <= 0) {
            alert("Error: Por favor, introduce valores numéricos positivos válidos para Tamaño X y Tamaño Y.");
            return; // Detener la ejecución si los tamaños no son válidos
        }
        if (isNaN(duracionComp) || duracionComp <= 0) {
            alert("Error: Por favor, introduce un valor numérico positivo válido para la Duración.");
            return; // Detener la ejecución si la duración no es válida
        }
        if (isNaN(frameRateComp) || frameRateComp <= 0) {
            alert("Error: Por favor, introduce un valor numérico positivo válido para el Frame Rate.");
            return; // Detener la ejecución si los tamaños no son válidos
        }

        if (nombres.replace(/\s/g, '') === "") { // Verificar si el campo de nombres está vacío (ignorando espacios)
            alert("Error: Por favor, introduce al menos un nombre para las composiciones.");
            return; // Detener si no hay nombres
        }

        // Dividir los nombres por saltos de línea y filtrar líneas vacías
        var listaNombres = nombres.split(/[\r\n]+/); // Divide por \n o \r\n
        var nombresValidos = [];
        for (var i = 0; i < listaNombres.length; i++) {
            var nombreLimpio = listaNombres[i].replace(/^\s+|\s+$/g, ''); // Quitar espacios al inicio/final
            if (nombreLimpio !== "") {
                nombresValidos.push(nombreLimpio);
            }
        }

        if (nombresValidos.length === 0) {
            alert("Error: No se encontraron nombres válidos en la lista.");
            return;
        }

        // --- Lógica de Creación de Composiciones ---
        app.beginUndoGroup("Crear Composiciones Batch"); // Iniciar grupo para deshacer

        var pixelAspectComp = 1.0; // Pixel Aspect Ratio cuadrado por defecto (puedes añadir un campo para esto si quieres)

        for (var j = 0; j < nombresValidos.length; j++) {
            app.project.items.addComp(nombresValidos[j], tamX, tamY, pixelAspectComp, duracionComp, frameRateComp);
        }

        app.endUndoGroup(); // Finalizar grupo para deshacer

        // Cerrar la ventana devolviendo 1 (indicando OK)
        ventana.close(1);
    };

    // Acción al hacer clic en Cancelar
    botonCancelar.onClick = function() {
        // Simplemente cerrar la ventana devolviendo 2 (indicando Cancel)
        ventana.close(2);
    };

    // --- Mostrar la Ventana ---
    ventana.center(); // Centrar la ventana en la pantalla
    var resultado = ventana.show(); // Mostrar la ventana y esperar a que se cierre

    // Opcional: Puedes verificar el resultado después de que la ventana se cierre
    // Ya no es tan necesario hacer algo aquí porque la lógica principal está en el onClick
    // if (resultado === 1) {
    //     $.writeln("Composiciones creadas.");
    // } else {
    //     $.writeln("Operación cancelada.");
    // }
}

// --- Ejecutar la función para crear y mostrar la interfaz ---
// Ya no necesitamos el UndoGroup aquí, se movió al onClick del botón Aceptar
// app.beginUndoGroup("Abrir Interfaz Crear Composiciones");

crearInterfazNombresTamaño();

// app.endUndoGroup();

#target aftereffects

// Envolvemos todo en una función para mantener el código organizado y evitar conflictos.
function crearInterfazSimple() {

    // --- 1. Creación de la Ventana Principal ---
    // 'palette' crea una ventana flotante que no bloquea el uso de After Effects.
    var ventana = new Window("palette", "Añadir Marcadores en Timeline", undefined);
    ventana.orientation = "column"; // Los elementos se apilarán verticalmente
    ventana.alignChildren = ["fill", "top"]; // Alinear para que el dropdown pueda ocupar el ancho
    ventana.spacing = 10; // Espacio entre elementos.
    ventana.margins = 16; // Margen interior de la ventana.

    // --- NUEVO: Grupo para el Dropdown de Composiciones ---
    var grupoComp = ventana.add("group", undefined, { name: "grupoComp" });
    grupoComp.orientation = "row";
    grupoComp.alignChildren = ["left", "center"];
    grupoComp.spacing = 10;

    grupoComp.add("statictext", undefined, "Comp:");
    var dropdownComps = grupoComp.add("dropdownlist", undefined, undefined, { name: "dropdownComps" });
    dropdownComps.helpTip = "Selecciona la composición de destino.";
    dropdownComps.preferredSize.width = 200; // Ancho del dropdown

    // Rellenar el dropdown con las composiciones del proyecto
    for (var i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i) instanceof CompItem) {
            dropdownComps.add("item", app.project.item(i).name);
        }
    }
    if (dropdownComps.items.length > 0) {
        dropdownComps.selection = 0; // Seleccionar el primer ítem por defecto
    }

    // --- 2. Grupo para la Etiqueta y el Campo de Texto ---
    // Un grupo nos permite alinear elementos en una misma fila.
    var grupoInput = ventana.add("group", undefined, { name: "grupoInput" });
    grupoInput.orientation = "row"; // Los elementos se colocarán uno al lado del otro.
    grupoInput.alignChildren = ["left", "center"]; // Alinear verticalmente los elementos del grupo.
    grupoInput.spacing = 10;

    // Añadimos la etiqueta de texto "Segundos".
    var etiqueta = grupoInput.add("statictext", undefined, "Segundos:");

    // Añadimos el cuadro de texto editable.
    // [x, y, ancho, alto], texto inicial
    var campoTexto = grupoInput.add("edittext", [0, 0, 80, 25], "5");
    campoTexto.helpTip = "Introduce aquí el intervalo en segundos."; // Mensaje de ayuda al pasar el ratón.

    // --- 3. Botón de Ejecución ---
    // Lo añadimos directamente a la ventana, debajo del grupo anterior.
    var botonEjecutar = ventana.add("button", undefined, "Ejecutar", { name: "ok", alignment: "center" });
    botonEjecutar.preferredSize.width = 150; // Hacemos el botón un poco más ancho.

    // --- 4. Lógica del Botón ---
    // Esto es lo que sucederá cuando hagas clic en el botón "Ejecutar".
    botonEjecutar.onClick = function() {
        // Obtenemos el texto del campo de texto.
        var segundosTexto = campoTexto.text;
        
        // Convertimos el texto a un número. Usamos parseFloat para permitir decimales.
        var cada_segundos = parseFloat(segundosTexto);

        // Validación: Verificamos si la entrada es un número válido y positivo.
        if (isNaN(cada_segundos) || cada_segundos <= 0) {
            alert("Error: Por favor, introduce un número positivo válido para los segundos.");
            return; // Detenemos la ejecución si el valor no es válido.
        }

        // --- ¡ACCIÓN PRINCIPAL! ---
        
        // 1. Obtener la composición seleccionada del dropdown
        if (dropdownComps.selection == null) {
            alert("Error: No hay ninguna composición seleccionada (o no hay composiciones en el proyecto).");
            return;
        }
        
        var nombreCompSeleccionada = dropdownComps.selection.text;
        var compActiva = null;

        // Buscar el objeto de composición en el proyecto por su nombre
        for (var i = 1; i <= app.project.numItems; i++) {
            if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === nombreCompSeleccionada)) {
                compActiva = app.project.item(i);
                break;
            }
        }

        // 2. Verificar si es una composición válida
        if (compActiva == null) {
            alert("Error: No se pudo encontrar la composición '" + nombreCompSeleccionada + "' en el proyecto.");
            return;
        }

        // Abrir la composición en el visor para que sea la activa
        compActiva.openInViewer();

        // Iniciar grupo de deshacer para poder revertir la acción con un solo Ctrl+Z
        app.beginUndoGroup("Añadir Marcadores de Tiempo");

        try { // Usamos un bloque try...finally para asegurarnos de que el UndoGroup se cierre siempre
            var compDuration = compActiva.duration;
            var marcadoresAñadidos = 0;

            // 3. Recorrer la duración de la composición en los intervalos definidos
            for (var tiempoActual = cada_segundos; tiempoActual < compDuration; tiempoActual += cada_segundos) {
                // 4. Crear un nuevo marcador. El comentario será el tiempo en el que se coloca.
                var comentarioMarcador = tiempoActual.toFixed(2).toString() + "s"; // Redondeamos a 2 decimales para el nombre
                var nuevoMarcador = new MarkerValue(comentarioMarcador);
                
                // 5. Añadir el marcador a la REGLA DE TIEMPO de la composición. Esta es la línea clave.
                compActiva.markerProperty.setValueAtTime(tiempoActual, nuevoMarcador);
                marcadoresAñadidos++;
            }

            alert("Se han añadido " + marcadoresAñadidos + " marcadores a la composición '" + compActiva.name + "'.");

        } finally {
            app.endUndoGroup(); // Finalizar grupo de deshacer, incluso si hay un error
        }

        // Si quieres que la ventana se cierre después de ejecutar la acción, elimina las barras de la siguiente línea.
        ventana.close();
    };

    // --- 5. Mostrar la Ventana ---
    ventana.center(); // Centra la ventana en la pantalla.
    ventana.show();   // Muestra la ventana.
}

// --- Ejecutar la función principal para iniciar el script ---
crearInterfazSimple();

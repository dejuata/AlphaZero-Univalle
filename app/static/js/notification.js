// obtener permiso
Notification.requestPermission();

function notifyMe(opciones) {
    let titulo = 'White Horse'
    // Comprobamos si el navegador soporta las notificaciones
    if (!("Notification" in window)) {
        alert("Este navegador no soporta las notificaciones del sistema");
    }
    // Comprobamos si ya nos habían dado permiso
    else if (Notification.permission === "granted") {
        var notification = new Notification(titulo, opciones);
    }

    // Si no, tendremos que pedir permiso al usuario
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // Si el usuario acepta, lanzamos la notificación
            if (permission === "granted") {
                var notification = new Notification("Gracias majo!");
            }
        });
    }

    // Finalmente, si el usuario te ha denegado el permiso y 
    // quieres ser respetuoso no hay necesidad molestar más.
}
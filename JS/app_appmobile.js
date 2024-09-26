const images = [
    "Assets/appmobile_login.png",
    "Assets/appmobile_pantallaprincipal.png",
    "Assets/appmobile_pantallaprincipal-1.png",
    "Assets/appmobile_pantallaprincipal-1.png",
    "Assets/appmobile_submenu.png",
    "Assets/appmobile_filtros.png",
    "Assets/appmobile_orden.png",
    "Assets/appmobile_menu_contextual.png",
    "Assets/appmobile_incidente.png",
    "Assets/appmobile_incidente.png",
    "Assets/appmobile_incidente_submenu.png",
    "Assets/appmobile_ubicacion.png",
    "Assets/appmobile_maps.png",
    "Assets/appmobile_datos_equipo.png",
    "Assets/appmobile_datos_edicion.png",
    "Assets/appmobile_instancias.png",
    "Assets/appmobile_nueva_instancia.png",
    "Assets/appmobile_instancia_contador.png",
    "Assets/appmobile_incidente_costo.png",
    "Assets/appmobile_instancia_conforme.png",
    "Assets/appmobile_instancia_sector.png",
    "Assets/appmobile_instancia_fotos.png",
    "Assets/appmobile_instancias_1.png",
    "Assets/appmobile_modificar_instancia.png",
    "Assets/appmobile_eliminar_instancia.png",
];

function preloadImages(imageArray) {
    imageArray.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages(images); // 'images' es tu array de imágenes


const infoData = [
    {
        title: "Acceso a la Aplicación de Canal Directo",
        step1: "• Descargue Canal Directo Mobile desde el PlayStore de Google.",
        step2: "• Instale y abra la aplicación en su celular.",
        step3: "• Ingrese el usuario y contraseña proporcionados por Canal Directo.",
        note: "Nota: El proceso de sincronización con los servidores puede tardar entre 5 y 15 minutos."
    },
    {
        title: "Pantalla Principal",
        step1: "• A la derecha podrá visualizar la primera pantalla que mostrará la aplicación durante el proceso de sincronización inicial.",
        step2: "• La primera vez que accede al sistema se cargarán todos los incidentes vinculados al agente.",
        step3: "• Esta tarea puede demorar de acuerdo a la cantidad de casos asignados que tenga.",
        note: "Nota: Asegúrese de estar conectado a una red estable para una mejor experiencia."
    },
    {
        title: "Bandeja de Servicios Técnicos",
        step1: "• En esta bandeja aparecerán los servicios técnicos asignados.",
        step2: "• Información visualizada en la pantalla:<br><br>",
        step3: "  <strong>- Nro. de Incidente:</strong> Número de servicio técnico generado por CD.<br>",
        step4: "  <strong>-<img src='Assets/appmobile_sincro.png' alt='Descarga' style='width: 25px;'> Icono de Sincronización del servicio:</strong> Indica si todos los datos del incidente están sincronizados con los servidores de CD.<br>",
        step5: " <strong> - Cliente-Sucursal:</strong> Nombre del cliente sucursal donde se encuentra el equipo.<br>",
        step6: "  <strong>- Marca y modelo del equipo.</strong><br>",
        step7: "  <strong>- Nro. de serie del equipo.</strong><br>",
        step8: "  <strong>- Tipo de servicio y Estado del servicio:</strong> Indica el tipo de servicio (correctivo, preventivo, guardia, etc.) y su estado (derivado, en curso, finalizado, etc.).<br>",
        step9: "  <strong>- Fecha de Ingreso.</strong><br>",
        step10: "  <strong>- Icono de prioridad del servicio:</strong> Indica el SLA del servicio.<br><br>",
    },

    {
        title: "Bandeja de Servicios Técnicos",
        step1: "• En la parte superior de la pantalla se encuentran las opciones de sincronización, filtros y ordenamiento:",
        step2: "  <strong>-<img src='Assets/appmobile_btn_sincro.png' alt='Descarga' style='width: 25px;'> Botón de sincronización de servicio:</strong> Permite actualizar la información visualizada en pantalla.",
        step3: "  <strong>-<img src='Assets/appmobile_btn_busqueda.png' alt='Descarga' style='width: 25px;'> Botón de selección de filtros:</strong> Permite buscar un incidente por nombre del cliente.",
        step4: "  <strong>-<img src='Assets/appmobile_btn_agregar.png' alt='Descarga' style='width: 25px;'> Botón de Orden:</strong> Despliega un submenu con las opciones de Filtro y Orden",
        note: ""
    },
    {
        title: "Bandeja de Servicios Técnicos",
        step1: "• En la parte superior de la pantalla se encuentran el boton <img src='Assets/appmobile_btn_agregar.png' alt='Descarga' style='width: 25px;'> que despliega el submenu con las siguientes opciones :",
        step2: "  <strong>- Botón de selección de filtros:</strong> Permite filtrar la visualización de acuerdo al tipo de incidente.",
        step3: "  <strong>- Botón de Orden:</strong> Permite ordenar los incidentes de acuerdo a vuestra preferencia.",
        note: ""
    },
    {
        title: "Seleccionar Filtros en la Bandeja de Incidentes",
        step1: "• La selección de filtros se divide en dos partes:<br><br>",
        step2: "<strong>I. Por estado:</strong>",
        step3: " <strong> - Asignados:</strong> Incidentes derivados o en curso, pendientes de actualización.",
        step4: " <strong> - En proceso:</strong> Incidentes en estados derivados, en curso, en espera de repuestos, backup o finalizados.",
        step5: " <strong> - Demorados:</strong> Muestra solo los incidentes demorados.",
        step6: " <strong> - Todos:</strong> Incluye todos los incidentes, incluso los que están cerrados.<br><br>",
        step7: "<strong>II. Por tipo de incidente:</strong>",
        step8: "  <strong>- Preventivos:</strong> Muestra solo los incidentes preventivos.",
        step9: "  <strong>- Todos excepto preventivos:</strong> Muestra todos los incidentes excepto los preventivos.",
        step10: " <strong> - Todos:</strong> Muestra todos los incidentes, independientemente del tipo.",
        note: "<strong> Nota:</strong> Utilice los filtros para gestionar y visualizar los incidentes según el estado o el tipo."
    },
    {
        title: "Seleccionar Orden de la Bandeja de Incidentes",
        step1: "• El orden de la bandeja de incidentes queda a preferencia del agente. Se puede ordenar por las siguientes opciones:",
        step2: "  - <strong>Número de incidente:</strong> Ordena los incidentes por su número de identificación.",
        step3: "  - <strong>Estado:</strong> Ordena los incidentes de acuerdo a su estado (derivado, en curso, finalizado, etc.).",
        step4: "  - <strong>Tipo:</strong> Ordena los incidentes de acuerdo a su tipo (correctivo,precorrectivo, etc.).",
        step5: "  - <strong>Cliente:</strong> Ordena los incidentes de acuerdo al cliente.",
        step6: "  - <strong>Sucursal:</strong> Ordena los incidentes de acuerdo a la sucursal de cada cliente.",
        step7: "  - <strong>Sector:</strong> Ordena los incidentes de acuerdo al sector de cada cliente.",
        note: "Nota: Ajuste el orden según la preferencia para priorizar la gestión de los incidentes."
    },
    {
        title: "Menú Contextual de la Aplicación Mobile",
        step1: "• <strong>Incidentes:</strong> Muestra la bandeja de incidentes explicada anteriormente.",
        step2: "• <strong>Recupero por cercania:</strong> Permite descargar las impresoras que le falta el contador por medio del a ubicacion",
        step3: "• <strong>Cartuchos:</strong> Permite ingresar reclamos por cartuchos defectuosos.",
        step4: "• <strong>Casilla de Mensajes:</strong> Permite visualizar notificaciones puntuales por fallas o problemas en la aplicación.",
        step5: "• <strong>Preferencias:</strong> Permite cambiar el tipo de notificación de la app (sonido o vibrar).",
        step6: "• <strong>Acerca de:</strong> Informa la versión de la app.",
        step7: "• <strong>Cerrar Sesión:</strong> Cierra sesión de la app.",
        note: "Importante: Al cerrar sesión, la app se desconecta completamente. Al iniciar sesión nuevamente, la sincronización puede demorar según los incidentes asignados."
    },
    {
        title: "Detalle de un Incidente de Servicio Técnico",
        step1: "• <strong>Resumen del incidente:</strong> La pantalla muestra un resumen con la siguiente información en orden de aparición:",
        step2: "  - <strong>Número de incidente</strong>",
        step3: "  - <strong>Empresa</strong>",
        step4: "  - <strong>Sucursal</strong>",
        step5: "  - <strong>Serie del equipo</strong>",
        step6: "  - <strong>Modelo del equipo</strong>",
        step7: "  - <strong>Tipo de incidente</strong>",
        step8: "  - <strong>Estado</strong>: El estado en el que se encuentra el incidente.",
        step9: "  - <strong>Fecha y hora de ingreso</strong> del pedido.",
        step10: "  - <strong>Datos del solicitante</strong> y <strong>del usuario</strong>.",
        step11: "  - <strong>Tiempo al vencimiento</strong>.",
        note: "Nota: Todos estos menús serán explicados en detalle más adelante."
    },
    {
        title: "Detalle de un Incidente de Servicio Técnico",
        step1: "• <strong>Menús desplegables:</strong> Tres menús con información adicional:",
        step2: "  - <strong>Instancias:</strong> Muestra la lista de instancias del incidente.",
        step3: "  - <strong>Bitácora:</strong> Chat interno con CD.",
        step4: "  - <strong>Repuestos:</strong> Asignación de repuestos utilizados (no disponible por el momento).",
        step5: "• <strong>Iconos en la parte superior:</strong>",
        step6: "  -<img src='Assets/appmobile_btn_agregar_instancia.png' alt='Descarga' style='width: 25px;'> Permite asignar nuevas instancias al incidente.",
        step7: "  - <img src='Assets/appmobile_btn_camara.png' alt='Descarga' style='width: 25px;'>Permine agregar fotos al incidente.",
        step8: "  - <img src='Assets/appmobile_btn_agregar.png' alt='Descarga' style='width: 15px;'>Submenu que permite agregar un repuesto y ver la galeria de fotos del incidente.",
        note: "Nota: Todos estos menús serán explicados en detalle más adelante."
    },
    {
        title: "Detalle de un Incidente de Servicio Técnico",
        step1: "•En la parte superior de la pantalla se encuentran el boton <img src='Assets/appmobile_btn_agregar.png' alt='Descarga' style='width: 25px;'> que despliega el submenu con las siguientes opciones :",
        step2: "  - <strong>Galeria:</strong> Muestra las imagenes adjuntas al incidente.",
        step3: "  - <strong>Asignar repuesto:</strong> Permite asignar el repuesto utilizado en el incidente.",

        note: "Nota: Todos estos menús serán explicados en detalle más adelante."
    },
    {
        title: "Visualizar Datos de la Empresa y Sucursal",
        step1: "• <strong>Acceso al detalle:</strong> Al presionar <strong>Empresa / Sucursal</strong>, se accederá a la información detallada de la locación del cliente.",
        step2: "• <strong>Datos disponibles:</strong> Se podrá visualizar la siguiente información:",
        step3: "  - <strong>Dirección</strong> de la sucursal.",
        step4: "  - <strong>Teléfono</strong> de contacto.",
        note: "Nota: Esta información es útil para la gestión de los servicios técnicos en la ubicación correspondiente."
    },
    {
        title: "Visualizar Datos de la Empresa y Sucursal",
        step1: "• <strong>Apertura de mapa:</strong> Al presionar en la dirección, la app abrirá el mapa (de acuerdo a la versión de teléfono y GPS disponible) para mostrar la ubicación exacta y/u orientarse hacia la sucursal.",
        note: "Nota: Las coordenadas son previamente cargadas en la base de datos de CD. Si no está cargada la latitud y longitud del cliente, la app sincronizará los datos de acuerdo a la dirección, lo que puede generar inexactitudes."
    },
    {
        title: "Visualización de los Datos del Equipo",
        step1: "• <strong>Acceso al detalle del equipo:</strong> Al presionar <strong>Serie / Modelo</strong>, se accederá al detalle de la impresora a reparar.",
        step2: "• <strong>Datos disponibles en esta ventana:</strong>",
        step3: "  - <strong>ID:</strong> Número de identificación de la impresora en la base de datos de CD.",
        step4: "  - <strong>Serial:</strong> Número de serie del equipo.",
        step5: "  - <strong>Marca:</strong> Marca de la impresora.",
        step6: "  - <strong>Sector:</strong> Sector en el cual se encuentra el equipo.",
        step7: "  - <strong>Conexión:</strong> Tipo de conexión de la impresora.",
        step8: "  - <strong>Mono / Color:</strong> Último contador de acuerdo a su tipo (monocromo o color).",
        step9: "• <strong>Historial técnico:</strong> Debajo de estos datos, se podrá visualizar el historial técnico de la impresora, lo cual permite acceder a información de incidentes anteriores.",
        step10: "• <strong>Utilidad del historial:</strong> Es útil para anticiparse a la necesidad de repuestos y coordinar con otros técnicos sobre las tareas previas sin necesidad de consultas adicionales.",
        step11: "• <strong>Modificación de datos:</strong> Si alguno de los datos precargados no coincide con la información actual, estos podrán ser modificados en el sistema.",
        note: "Nota: Revisar los datos del equipo y el historial técnico ayuda a una mejor gestión de los incidentes y a evitar errores en futuras intervenciones."
    },
    {
        title: "Editar Datos del Equipo",
        step1: "• <strong>Acceso a la edición:</strong> En la esquina superior derecha de la pantalla se encuentra el icono de edición<img src='Assets/appmobile_btn_edicion.png' alt='Descarga' style='width: 25px;'>. Al presionarlo, se abrirá una nueva ventana con opciones de edición.",
        step2: "• <strong>Campos editables:</strong> Por razones de seguridad, solo podrán editarse los siguientes campos:",
        step3: "  - <strong>Sector:</strong> Editable directamente, permite escribir un nuevo valor para el sector.",
        step4: "  - <strong>Tipo de Conexión:</strong> Cuenta con un menú desplegable con las siguientes cinco opciones:",
        step5: "    1. Indeterminado",
        step6: "    2. Red",
        step7: "    3. USB",
        step8: "    4. Paralelo",
        step9: "    5. Otra",
        step10: "• <strong>Importancia de los cambios:</strong> Esta información es clave para mantener actualizada la base de datos del equipo.",
        step11: "• <strong>Confirmación del cambio:</strong> Una vez realizada la edición, se enviará un correo electrónico a MDA informando el pedido de actualización del equipo. Por ejemplo, si se cambia el sector de 'Indeterminado' a 'Gcia Local', será notificado.",
        note: "Nota: El cambio de sector está sujeto a la confirmación de MDA."
    },
    {
        title: "Visualización de Instancias",
        step1: "• Al desplegar el menú de instancias, podrá visualizar todas las instancias previas al estado actual del incidente.",
        step2: "• <strong>Pendiente:</strong> Muestra la fecha de toma del pedido, la falla reportada, y cualquier observación relevante para la reparación.",
        step3: "• <strong>Derivado:</strong> Información al momento de derivar el incidente, con observaciones relacionadas con el cliente.",
        step4: "• <strong>En Curso:</strong> El momento en que se inicia la reparación. Esta instancia es completada por el agente desde el celular o por el responsable de la WAG. Se recomienda que cada técnico la complete para mantener la información actualizada.",
        step5: "• <strong>Espera de Repuestos:</strong> Muestra las tareas realizadas y las observaciones cuando el equipo queda a la espera de un repuesto. Se incluye cuál es la parte solicitada y si el equipo está operativo o no.",
        step6: "• Además, podrá visualizar el estado del incidente actualizado por el agente, tales como:",
        step7: "  - <strong>Finalizado</strong>",
        step8: "  - <strong>Demorado</strong>",
        step9: "  - <strong>Backup</strong>",
        step10: "  - <strong>En Taller para Reparación</strong>",
        note: ""
    },
    {
        title: "Agregar una Instancia nueva a un Incidente",
        step1: "• Luego de sincronizar la aplicación y visualizar los incidentes pendientes de resolución, se deben completar las instancias de cada uno de los incidentes.",
        step2: "• Para agregar una instancia, presione el ícono<img src='Assets/appmobile_btn_agregar_instancia.png' alt='Descarga' style='width: 25px;'> correspondiente anteriormente explicado.",
        step3: "• Al accionar el ícono, se abrirá una nueva ventana con opciones de resolución del caso.",
        step4: "• Este ejemplo aplica para incidentes que estén en la instancia <strong>En Curso</strong>. Si el incidente se encuentra <strong>Finalizado</strong>, presione la opción correspondiente.",
        step5: "• A continuación, se abrirá una ventana para completar la información sobre las tareas realizadas y las observaciones, si las hubiese.",
        step6: "• Una vez completados estos campos, accione la flecha<img src='Assets/appmobile_btn_flecha.png' alt='Descarga' style='width: 15px;'> en la esquina superior derecha para continuar.",
        note: ""
    },
    {
        title: "Completar Contador y Fecha de Finalización",
        step1: "• Después de avanzar, la ventana mostrará un campo para completar el <strong>contador de páginas</strong> y un <strong>calendario</strong> para seleccionar la <strong>fecha de finalización</strong>.",
        step2: "• Si el <strong>contador de páginas</strong> es incorrecto, la app mostrará un mensaje en la pantalla.",
        step3: "• Si no se ingresa un <strong>contador</strong>, la app solicitará que se especifique el motivo."
    },
    {
        title: "Asignación del Costo del Servicio",
        step1: "• Una de las funcionalidades que brinda la App Mobile es la <strong>asignación del costo del servicio</strong>.",
        step2: "• Para ello, presione nuevamente la <strong>flecha en la esquina superior derecha</strong> y aparecerá la pantalla de costos.",
        step3: "• Por defecto, se mostrará el <strong>costo pre-establecido</strong> por Canal Directo.",
        step4: "• Se podrá asignar la <strong>cantidad de Km</strong> para calcular el viático, siendo el <strong>costo de Km</strong> también pre-establecido por CD.",
        step5: "• Una vez ingresados los datos, se calculará el <strong>total del costo del incidente</strong>.",
        step6: "• Todo cambio estará sujeto a confirmación por parte de CD.",
        step7: "• Para aplicar los cambios, presione la flecha<img src='Assets/appmobile_btn_flecha.png' alt='Descarga' style='width: 15px;'> en la <strong>esquina superior derecha</strong> nuevamente."
    },
    {
        title: "Conforme del Cliente para Finalizar el Incidente",
        step1: "• Al finalizar el incidente, la App Mobile solicitará la conformidad del cliente.",
        step2: "• Se abrirá una ventana con los siguientes <strong>campos obligatorios</strong> para completar:",
        step3: "  - <strong>Nombre</strong>: Nombre del cliente que otorga la conformidad.",
        step4: "  - <strong>Apellido</strong>: Apellido del cliente.",
        step5: "  - <strong>Legajo</strong>: Número de legajo o identificación del cliente.",
        step6: "• Para aplicar los cambios, presione la flecha<img src='Assets/appmobile_btn_flecha.png' alt='Descarga' style='width: 15px;'> en la <strong>esquina superior derecha</strong> nuevamente."
    },
    {
        title: "Información del Sector y Opciones de Trabajo Realizado",
        step1: "• Al completar el trabajo realizado, la App Mobile solicitará la <strong>confirmación del sector</strong> donde se realizó el servicio.",
        step2: "• Se abrirá una ventana con los siguientes <strong>campos obligatorios</strong> para completar:",
        step3: "  - <strong>Sector</strong>: Ingrese o seleccione el sector donde se encuentra la impresora.",
        step4: "• Además, se proporcionarán las siguientes <strong>opciones adicionales</strong>:",
        step5: "  - <strong>Cambio de Placa Controller</strong>: Marque esta opción si durante el trabajo se cambió la placa controller de la impresora.",
        step6: "  - <strong>Generar Incidente Precorrectivo</strong>: Marque esta opción si es necesario generar un incidente precorrectivo. Esta opción solo debe ser seleccionada si el problema identificado no afecta el funcionamiento actual de la impresora.",
        step7: "• Para aplicar los cambios, presione la flecha<img src='Assets/appmobile_btn_flecha.png' alt='Descarga' style='width: 15px;'> en la <strong>esquina superior derecha</strong> nuevamente."
    },
    {
        title: "Subir Fotos Requeridas para Finalizar el Incidente",
        step1: "• Antes de finalizar el incidente, la App Mobile solicitará que se suban las <strong>fotos obligatorias</strong> para completar el proceso.",
        step2: "• Se abrirá una ventana con los siguientes campos para adjuntar las fotos correspondientes:",
        step3: "  - <strong>Foto de la Página de Configuración</strong>: Subir una imagen que muestre la configuración de la impresora.",
        step4: "  - <strong>Foto del Contador</strong>: Subir una imagen que muestre el contador de páginas de la impresora.",
        step5: "  - <strong>Foto de la Red</strong>: Subir una imagen que muestre la configuración de red de la impresora.",
        step6: "  - <strong>Foto del Interior de la Impresora</strong>: Subir una imagen del interior de la impresora, donde se vean los componentes clave.",
        step7: "  - <strong>Foto del Exterior de la Impresora</strong>: Subir una imagen del exterior de la impresora que muestre su estado físico.",
        step8: "• Para aplicar los cambios, presione la flecha<img src='Assets/appmobile_btn_flecha.png' alt='Descarga' style='width: 15px;'> en la <strong>esquina superior derecha</strong> nuevamente."
    },
    {
        title: "Sincronización de la Última Instancia Agregada",
        step1: "• Una vez completada la carga de las fotos, por defecto se volverá a la <strong>ventana principal del incidente</strong>.",
        step2: "• En la lista de instancias, se puede visualizar que la <strong>última instancia agregada</strong> no ha sincronizado aún, lo que se indicará con un <strong>icono de color rojo<img src='Assets/appmobile_sincro_rojo.png' alt='Descarga' style='width: 15px;'></strong>.",
        step3: "• Si la instancia se sincroniza correctamente, el <strong>icono cambiará a color verde<img src='Assets/appmobile_sincro_verde.png' alt='Descarga' style='width: 15px;'></strong>, indicando que los datos se han enviado con éxito a los servidores de CD.",
        step4: "• En caso de errores en la sincronización, se podrá intentar nuevamente desde el menú principal o verificando la conexión de red."
    },
    {
        title: "Editar una Instancia",
        step1: "• Las instancias se pueden editar en el caso de que se haya ingresado un dato erróneo.",
        step2: "• <strong>Las únicas instancias que NO se podrán modificar</strong> son las del tipo <strong>pendiente</strong> y <strong>derivado</strong>, ya que ambas son editadas por CD.",
        step3: "• Para modificar una instancia, se deberá presionar el <strong>icono de edición<img src='Assets/appmobile_btn_edicion.png' alt='Descarga' style='width: 25px;'></strong>.",
        step4: "• Por ejemplo, para editar la instancia <strong>“En Curso”</strong>, se presiona el icono correspondiente, lo cual abrirá nuevamente la pantalla para completar las tareas realizadas y las observaciones.",
        step5: "• Una vez completados los campos, se deberá presionar el <strong>icono de check<img src='Assets/appmobile_btn_check.png' alt='Descarga' style='width: 25px;'></strong> para aceptar o el <strong>icono de cruz</strong> para cancelar los cambios."
    },
    {
        title: "Eliminar una Instancia",
        step1: "• La eliminación de instancias es similar al proceso de edición, pero en este caso se deberá presionar el <strong>icono de eliminar<img src='Assets/appmobile_btn_eliminar_instancia.png' alt='Descarga' style='width: 25px;'></strong>.",
        step2: "• <strong>Las únicas instancias que NO se podrán eliminar</strong> son las del tipo <strong>pendiente</strong> y <strong>derivado</strong>, ya que ambas son gestionadas por CD.",
        step3: "• Al momento de eliminar una instancia, el sistema mostrará un cuadro de confirmación para validar la acción.",
        step4: "• Una vez confirmada la eliminación, la instancia será removida permanentemente y <strong>no se podrá recuperar la información previa</strong>."
    }
    
    
    
    
    // Agrega más objetos aquí si es necesario
];

let currentIndex = 0;
const imageElement = document.getElementById("current-image");
const infoBox = document.getElementById("info-box");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function updateInfoBox(data) {
    const sections = [];

    // Agregar título
    sections.push(`<h2>${data.title}</h2>`);

    // Descripción de la pantalla
    sections.push('<div class="section"><h3>Descripción de la Pantalla</h3>');

    // Agregar cada paso si está definido
    for (let i = 1; i <= 19; i++) {
        if (data[`step${i}`]) {
            sections.push(`<p>${data[`step${i}`]}</p>`);
        }
    }

    sections.push('</div>');

    // Agregar nota si está definida
    if (data.note) {
        sections.push('<div class="section"><h3>Nota</h3>');
        sections.push(`<p>${data.note}</p>`);
        sections.push('</div>');
    }

    // Actualizar el contenido del info-box
    infoBox.innerHTML = sections.join('');
}

function showImage(index) {
    imageElement.style.opacity = 0; // Fade out transition
    setTimeout(() => {
        imageElement.src = images[index];
        imageElement.style.opacity = 1; // Fade in transition
        updateInfoBox(infoData[index]); // Actualiza el info-box con la información
    }, 500); // Tiempo que dura el fade out
}

// Inicializa el contenido del info-box
updateInfoBox(infoData[currentIndex]);

// Eventos de los botones
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

// Mostrar la primera imagen al cargar
showImage(currentIndex);



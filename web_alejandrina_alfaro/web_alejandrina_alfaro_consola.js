document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SISTEMA DE NAVEGACIÓN (SPA) ---
  const navLinks = document.querySelectorAll(".nav-links a");
  const vistas = document.querySelectorAll(".vista");

  window.cambiarVista = function (targetId) {
    vistas.forEach((v) => v.classList.remove("active"));
    navLinks.forEach((l) => l.classList.remove("active"));

    const targetVista = document.getElementById(targetId);
    if (targetVista) targetVista.classList.add("active");

    const activeLink = document.querySelector(
      `.nav-links a[data-target="${targetId}"]`,
    );
    if (activeLink) activeLink.classList.add("active");

    if (targetId === "vista-sobre-mi") {
      const sobreMiLink = document.querySelector(
        `.nav-links a[data-target="vista-sobre-mi"]`,
      );
      if (sobreMiLink) sobreMiLink.classList.add("active");
    }
  };

  document.querySelectorAll("[data-target]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");
      cambiarVista(target);
    });
  });

  // --- 2. CURSOR PERSONALIZADO (Efecto Pincel/Tinta) ---
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    setTimeout(() => {
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;
    }, 50);
  });

  window.addEventListener("mousedown", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(2)";
    cursorOutline.style.transform =
      "translate(-50%, -50%) scale(0.8) rotate(45deg)";
  });
  window.addEventListener("mouseup", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    cursorOutline.style.transform =
      "translate(-50%, -50%) scale(1) rotate(0deg)";
  });

  // --- 3. LÓGICA DE MODALES (OBRAS Y TALLERES) ---
  const modalObra = document.getElementById("modal-obra");
  const modalTaller = document.getElementById("modal-taller");

  let obraSeleccionada = "";
  let tallerSeleccionado = "";

  window.abrirDetalleObra = function (titulo, tecnica, imgNombre) {
    document.getElementById("modal-obra-titulo").innerText = titulo;
    document.getElementById("modal-obra-tecnica").innerText = tecnica;

    const modalImgContainer = document.getElementById(
      "modal-obra-img-container",
    );
    modalImgContainer.innerHTML = `<span>[ IMAGEN: ${imgNombre} ]</span>`;

    obraSeleccionada = titulo;
    modalObra.classList.add("active");
  };

  window.abrirDetalleTaller = function (titulo, modalidad, duracion, desc) {
    document.getElementById("modal-taller-titulo").innerText = titulo;
    document.getElementById("modal-taller-modalidad").innerText = modalidad;
    document.getElementById("modal-taller-duracion").innerText = duracion;
    document.getElementById("modal-taller-desc").innerText = desc;

    tallerSeleccionado = titulo;
    modalTaller.classList.add("active");
  };

  window.cerrarModales = function () {
    modalObra.classList.remove("active");
    modalTaller.classList.remove("active");
  };

  // --- 4. AUTORELLENADO DEL FORMULARIO DE CONTACTO ---
  window.consultarObraDesdeModal = function () {
    cerrarModales();
    cambiarVista("vista-contacto");

    setTimeout(() => {
      const select = document.getElementById("subject");
      const textarea = document.getElementById("message");

      select.value = "Compra de Obra";
      textarea.value = `Hola Alejandrina, me interesa recibir más información y disponibilidad sobre la obra "${obraSeleccionada}".`;

      textarea.style.borderBottom = "2px solid #D9381E"; // Rojo
      textarea.focus();
    }, 500);
  };

  window.consultarTallerDesdeModal = function () {
    cerrarModales();
    cambiarVista("vista-contacto");

    setTimeout(() => {
      const select = document.getElementById("subject");
      const textarea = document.getElementById("message");

      select.value = "Talleres";
      textarea.value = `Hola Alejandrina, me gustaría recibir más información e inscribirme en el taller "${tallerSeleccionado}".`;

      textarea.style.borderBottom = "2px solid #D9381E"; // Rojo
      textarea.focus();
    }, 500);
  };
});

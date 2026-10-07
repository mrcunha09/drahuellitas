/* =========================================
   DRA. HUELLITAS
   NAVEGACIÓN + GALERÍA
   ========================================= */


/* =========================================
   ELEMENTOS DE NAVEGACIÓN
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbarMenu = document.getElementById("navbarMenu");

const sections = document.querySelectorAll(".page-section");

const menuLinks = document.querySelectorAll(
    ".navbar-menu a, .navbar-logo, .footer-logo, .footer-links a"
);


/* =========================================
   MOSTRAR UNA SOLA SECCIÓN
   ========================================= */

function showSection(sectionId) {

    /* Ocultar todas las secciones */

    sections.forEach(section => {
        section.classList.remove("active");
    });


    /* Buscar sección */

    const targetSection = document.getElementById(sectionId);


    /* Mostrar sección */

    if (targetSection) {
        targetSection.classList.add("active");
    }


    /* Cerrar menú móvil */

    if (menuToggle) {
        menuToggle.classList.remove("active");
    }

    if (navbarMenu) {
        navbarMenu.classList.remove("active");
    }


    /* Subir al principio */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   INICIAR PÁGINA
   ========================================= */

function initializePage() {

    /*
       Si existe un hash en la URL,
       mostrar esa sección.
       De lo contrario, mostrar Inicio.
    */

    const hash = window.location.hash;

    if (hash) {

        const sectionId = hash.substring(1);

        const targetSection =
            document.getElementById(sectionId);

        if (targetSection &&
            targetSection.classList.contains("page-section")) {

            showSection(sectionId);
            return;
        }
    }


    /* Mostrar Inicio */

    showSection("inicio");

}


/* =========================================
   ENLACES DE NAVEGACIÓN
   ========================================= */

menuLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        const href = this.getAttribute("href");


        /* Ignorar enlaces externos */

        if (!href || !href.startsWith("#")) {
            return;
        }


        event.preventDefault();


        const sectionId = href.substring(1);


        /* Mostrar sección */

        showSection(sectionId);


        /* Actualizar URL */

        history.pushState(
            null,
            "",
            "#" + sectionId
        );

    });

});


/* =========================================
   BOTÓN MENÚ MÓVIL
   ========================================= */

if (menuToggle && navbarMenu) {

    menuToggle.addEventListener("click", function(event) {

        event.stopPropagation();

        menuToggle.classList.toggle("active");

        navbarMenu.classList.toggle("active");

    });


    /* Cerrar al hacer click fuera */

    document.addEventListener("click", function(event) {

        const insideMenu =
            navbarMenu.contains(event.target);

        const insideButton =
            menuToggle.contains(event.target);


        if (!insideMenu && !insideButton) {

            menuToggle.classList.remove("active");

            navbarMenu.classList.remove("active");

        }

    });

}


/* =========================================
   BOTÓN ATRÁS / ADELANTE DEL NAVEGADOR
   ========================================= */

window.addEventListener("popstate", function() {

    const hash = window.location.hash;


    if (hash) {

        const sectionId = hash.substring(1);

        const targetSection =
            document.getElementById(sectionId);


        if (targetSection &&
            targetSection.classList.contains("page-section")) {

            showSection(sectionId);
            return;
        }

    }


    showSection("inicio");

});


/* =========================================
   INICIAR
   ========================================= */

initializePage();



/* =========================================
   GALERÍA
   ========================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryModal =
    document.getElementById("galleryModal");

const galleryModalImage =
    document.getElementById("galleryModalImage");

const galleryModalClose =
    document.getElementById("galleryModalClose");

const galleryModalPrev =
    document.getElementById("galleryModalPrev");

const galleryModalNext =
    document.getElementById("galleryModalNext");


let currentGalleryIndex = 0;


/* =========================================
   ABRIR IMAGEN
   ========================================= */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", function() {

        currentGalleryIndex = index;

        showGalleryImage(currentGalleryIndex);


        if (galleryModal) {

            galleryModal.classList.add("active");

        }


        document.body.style.overflow = "hidden";

    });

});


/* =========================================
   MOSTRAR IMAGEN
   ========================================= */

function showGalleryImage(index) {

    if (!galleryItems[index]) {
        return;
    }


    const image =
        galleryItems[index].querySelector("img");


    if (!image || !galleryModalImage) {
        return;
    }


    galleryModalImage.src = image.src;

    galleryModalImage.alt = image.alt;

}


/* =========================================
   IMAGEN ANTERIOR
   ========================================= */

if (galleryModalPrev) {

    galleryModalPrev.addEventListener("click", function() {

        currentGalleryIndex--;


        if (currentGalleryIndex < 0) {

            currentGalleryIndex =
                galleryItems.length - 1;

        }


        showGalleryImage(currentGalleryIndex);

    });

}


/* =========================================
   IMAGEN SIGUIENTE
   ========================================= */

if (galleryModalNext) {

    galleryModalNext.addEventListener("click", function() {

        currentGalleryIndex++;


        if (
            currentGalleryIndex >=
            galleryItems.length
        ) {

            currentGalleryIndex = 0;

        }


        showGalleryImage(currentGalleryIndex);

    });

}


/* =========================================
   CERRAR GALERÍA
   ========================================= */

function closeGallery() {

    if (galleryModal) {

        galleryModal.classList.remove("active");

    }


    document.body.style.overflow = "";

}


if (galleryModalClose) {

    galleryModalClose.addEventListener(
        "click",
        closeGallery
    );

}


/* =========================================
   CLICK FUERA DEL MODAL
   ========================================= */

if (galleryModal) {

    galleryModal.addEventListener("click", function(event) {

        if (event.target === galleryModal) {

            closeGallery();

        }

    });

}


/* =========================================
   TECLADO
   ========================================= */

document.addEventListener("keydown", function(event) {

    if (
        !galleryModal ||
        !galleryModal.classList.contains("active")
    ) {

        return;

    }


    /* ESC */

    if (event.key === "Escape") {

        closeGallery();

    }


    /* Flecha izquierda */

    if (event.key === "ArrowLeft") {

        if (galleryModalPrev) {

            galleryModalPrev.click();

        }

    }


    /* Flecha derecha */

    if (event.key === "ArrowRight") {

        if (galleryModalNext) {

            galleryModalNext.click();

        }

    }

});
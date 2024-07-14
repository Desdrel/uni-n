var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});








document.addEventListener('DOMContentLoaded', function() {
    const carrito = document.getElementById('carrito');
    const elementos = document.getElementById('lista');
    const elementos2 = document.getElementById('lista-2');
    const elementos3 = document.getElementById('lista-3');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const totalCarrito = document.querySelector('.total span');
    let articulosCarrito = [];

    cargarEventListeners();

    function cargarEventListeners() {
        elementos.addEventListener('click', comprarElemento);
        elementos2.addEventListener('click', comprarElemento);
        elementos3.addEventListener('click', comprarElemento);

        carrito.addEventListener('click', eliminarElemento);

        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

        document.addEventListener('DOMContentLoaded', leerLocalStorage);

        // Social links event listeners
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                const url = link.getAttribute('data-url');
                window.location.href = url;
            });
        });
    }

    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.parentElement.parentElement;
            leerDatosElemento(elemento);
        }
    }

    function leerDatosElemento(elemento) {
        const infoElemento = {
            imagen: elemento.querySelector('img').src,
            titulo: elemento.querySelector('h3').textContent,
            precio: elemento.querySelector('.precio').textContent,
            id: elemento.querySelector('a').getAttribute('data-id')
        };

        insertarCarrito(infoElemento);
    }

    function insertarCarrito(elemento) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width=100>
            </td>
            <td>
                ${elemento.titulo} 
            </td>
            <td>
                ${elemento.precio} 
            </td>
            <td>
                <a href="#" class="borrar" data-id="${elemento.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
        articulosCarrito.push(elemento);
        sincronizarStorage();
        calcularTotal();
    }

    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar')) {
            e.target.parentElement.parentElement.remove();
            const elementoId = e.target.getAttribute('data-id');
            articulosCarrito = articulosCarrito.filter(elemento => elemento.id !== elementoId);
            sincronizarStorage();
            calcularTotal();
        }
    }

    function vaciarCarrito() {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        articulosCarrito = [];
        sincronizarStorage();
        calcularTotal();
    }

    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }

    function leerLocalStorage() {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    }

    function carritoHTML() {
        limpiarHTML();
        articulosCarrito.forEach(elemento => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${elemento.imagen}" width=100>
                </td>
                <td>
                    ${elemento.titulo} 
                </td>
                <td>
                    ${elemento.precio} 
                </td>
                <td>
                    <a href="#" class="borrar" data-id="${elemento.id}">X</a>
                </td>
            `;
            lista.appendChild(row);
        });
        calcularTotal();
    }

    function calcularTotal() {
        let total = 0;
        articulosCarrito.forEach(elemento => {
            const precio = parseFloat(elemento.precio.replace('$', ''));
            total += precio;
        });
        totalCarrito.textContent = total.toFixed(2);
    }

    function limpiarHTML() {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }
});



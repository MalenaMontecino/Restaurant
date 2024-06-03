class Carta extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="carta">
                <h2>Carta</h2>
                <div id="platos-container" class="row">
                    <!-- Aquí se mostrarán los platos -->
                </div>
            </div>
        `;
        this.cargarPlatos();
    }

    cargarPlatos() {
       
        const platos = [
            { nombre: "Arroz con leche", imagen: "./img/arrozLeche.jpg", precio: 6, alergenos: ["gluten", "lactosa"], categoria: "postre" },
            { nombre: "Butifarra con judías", imagen: "./img/butifarraMogetes.jpg", precio: 15, alergenos: ["gluten"], categoria: "segundo" },
            { nombre: "Puré de calabaza", imagen: "./img/pureCalabaza.jpg", precio: 12, alergenos: ["lactosa"], categoria: "primero" },
            { nombre: "Flan de queso", imagen: "./img/flanQueso.jpg", precio: 7, alergenos: ["frutos secos", "gluten"], categoria: "postre" },
            { nombre: "Risotto", imagen: "./img/risotto.jpg", precio: 15, alergenos: ["frutos secos", "gluten"], categoria: "primero" },
            { nombre: "Salmón", imagen: "./img/salmon.png", precio:20, alergenos: ["frutos secos", "gluten"], categoria: "segundo" },
            { nombre: "Sopa de galets", imagen: "./img/sopaGalets.jpg", precio: 10, alergenos: ["frutos secos", "gluten"], categoria: "primero" },
            { nombre: "Tarta lotus", imagen: "./img/tartaLotus.jpg", precio: 8, alergenos: ["frutos secos", "gluten"], categoria: "postre" },
            { nombre: "Cachopo", imagen: "./img/cachopo.jpg", precio: 12, alergenos: ["frutos secos", "gluten"], categoria: "segundo" }
        ];

        const platosContainer = this.querySelector("#platos-container");

        
        const categorias = ["primero", "segundo", "postre", "bebida"];
        categorias.forEach(categoria => {
            const categoriaPlatos = platos.filter(plato => plato.categoria === categoria);

            if (categoriaPlatos.length > 0) {
                const categoriaHeader = document.createElement("h3");
                categoriaHeader.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
                categoriaHeader.style.display ="flex";
                categoriaHeader.style.justifyContent ="center";
                platosContainer.appendChild(categoriaHeader);

                const row = document.createElement("div");
                row.classList.add("row");
                platosContainer.appendChild(row);

                categoriaPlatos.forEach(plato => {
                    const col = document.createElement("div");
                    col.classList.add("col-md-4"); 
                    const platoElement = document.createElement("div");
                    platoElement.classList.add("plato");
                    platoElement.classList.add("card");
                    platoElement.innerHTML = `
                        <img src="${plato.imagen}" class="card-img-top" style="max-width: 100%; height: auto; object-fit: cover;" alt="${plato.nombre}">
                        <div class="card-body">
                            <h4>${plato.nombre}</h4>
                            <p>Precio: ${plato.precio} €</p>
                            <p>Alergenos: ${plato.alergenos.join(", ")}</p>
                            <button class="add-to-order btn btn-warning">Añadir al pedido</button>
                        </div>
                    `;
                    platoElement.querySelector(".add-to-order").addEventListener("click", () => {
                        this.dispatchEvent(new CustomEvent("platoSeleccionado", { detail: plato }));
                    });
                    col.appendChild(platoElement);
                    row.appendChild(col);
                });
            }
        });
    }
}

customElements.define('carta-component', Carta);

// pedido.js
class Pedido extends HTMLElement {
    constructor() {
        super();
        this.pedido = [];
    }

    connectedCallback() {
        this.render();
        this.addEventListener("platoSeleccionado", (event) => {
            this.agregarPlato(event.detail);
        });
    }

    render() {
        this.innerHTML = `
            <div class="pedido">
                <h2>Pedido</h2> <p>Total: <span id="total">0</span> €</p>
                <div id="pedido-container">
                    <!-- Aquí se mostrarán los platos del pedido -->
                </div>
               
            </div>
        `;
    }

    agregarPlato(plato) {
        this.pedido.push(plato);
        this.renderPedido();
    }

    quitarPlato(index) {
        this.pedido.splice(index, 1);
        this.renderPedido();
    }

    renderPedido() {
        const pedidoContainer = this.querySelector("#pedido-container");
        pedidoContainer.innerHTML = "";
        let total = 0;
        this.pedido.forEach((plato, index) => {
            total += plato.precio;
            const platoElement = document.createElement("div");
            platoElement.classList.add("plato");
            platoElement.classList.add("card");
            platoElement.innerHTML = `
                <img src="${plato.imagen}" style="max-width: 100%; height: auto; object-fit: cover;" class="card-img-top" alt="${plato.nombre}">
                <div class="card-body">
                    <h3>${plato.nombre}</h3>
                    <p class="categoria">${plato.categoria}</p> <!-- Añadir la categoría aquí -->
                    <p>Precio: ${plato.precio} €</p>
                    <button class="remove-from-order btn btn-outline-dark" data-index="${index}">Quitar del pedido</button>
                </div>
            `;
            platoElement.querySelector(".remove-from-order").addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                this.quitarPlato(index);
            });
            pedidoContainer.appendChild(platoElement);
        });
        this.querySelector("#total").textContent = total;
    }
    
}

customElements.define('pedido-component', Pedido);

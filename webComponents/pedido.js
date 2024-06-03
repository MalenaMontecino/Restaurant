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
                    <!-- platos seleccionados -->
                </div>
            </div>
        `;
    }

    agregarPlato(plato) {
        const existente = this.pedido.find(p => p.nombre === plato.nombre);
        if (existente) {
            existente.cantidad += 1;
        } else {
            plato.cantidad = 1;
            this.pedido.push(plato);
        }
        this.renderPedido();
    }

    actualizarCantidad(index, nuevaCantidad) {
        if (nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }
        this.pedido[index].cantidad = nuevaCantidad;
        this.renderPedido();
    }

    incrementarCantidad(index) {
        this.pedido[index].cantidad += 1;
        this.renderPedido();
    }

    decrementarCantidad(index) {
        if (this.pedido[index].cantidad > 1) {
            this.pedido[index].cantidad -= 1;
        } else {
            this.pedido.splice(index, 1);
        }
        this.renderPedido();
    }

    renderPedido() {
        const pedidoContainer = this.querySelector("#pedido-container");
        pedidoContainer.innerHTML = "";
        let total = 0;
        this.pedido.forEach((plato, index) => {
            total += plato.precio * plato.cantidad;
            const platoElement = document.createElement("div");
          
            platoElement.classList.add("plato");
            platoElement.classList.add("card");
            platoElement.innerHTML = `
                <img src="${plato.imagen}" style="max-width: 100%; height: auto; object-fit: cover;" class="card-img-top" alt="${plato.nombre}">
                <div class="card-body">
                    <p class="categoria">${plato.categoria}</p>
                    <h3>${plato.nombre}</h3>
                    <p>Precio: ${plato.precio} €</p>
                    
                    <div class="cantidad-control"> 
                    <button class="incrementar btn btn-outline-success" data-index="${index}">+</button> 
                        
                        <input type="number" style=" margin-left:15%; width: 3rem; border:none" class="cantidad" data-index="${index}" value="${plato.cantidad}" min="1">
                       <button class="decrementar btn btn-outline-danger" data-index="${index}">-</button>
                    </div>
                </div>
            `;
            platoElement.querySelector(".decrementar").addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                this.decrementarCantidad(index);
            });
            platoElement.querySelector(".incrementar").addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                this.incrementarCantidad(index);
            });
            platoElement.querySelector(".cantidad").addEventListener("change", (event) => {
                const index = event.target.dataset.index;
                const nuevaCantidad = parseInt(event.target.value, 10);
                this.actualizarCantidad(index, nuevaCantidad);
            });
            pedidoContainer.appendChild(platoElement);
        });
        this.querySelector("#total").textContent = total;
    }
}

customElements.define('pedido-component', Pedido);

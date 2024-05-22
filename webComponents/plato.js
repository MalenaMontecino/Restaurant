// plato.js
class Plato extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const plato = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        this.innerHTML = `
            <div class="plato ">
                <h3>${plato}</h3>
                <p>Precio: ${precio} €</p>
            </div>
        `;
    }
}

customElements.define('plato-component', Plato);

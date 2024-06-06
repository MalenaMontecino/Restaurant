// plato.js
class Plato extends HTMLElement {
    //inicializar el elemento
    constructor() {
        super();
    }
    //se invoca cada vez que el elemento es agreado al DOM
    connectedCallback() {
        //actualizar el contenido del elemento
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
//registrar nuevo elemento y asocia con la clase
customElements.define('plato-component', Plato);

class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                    transition: all .2s ease;
                }
                #modal {
                    position: fixed;
                    top: 15vh;
                    left: 30%;
                    width: 40%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                    transform: translateY(-30%);
                    transition: all .2s ease;
                }
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                :host([opened]) #modal {
                    transform: translateY(0);
                }
                header {
                    padding: 1rem;
                }
                ::slotted(h1) {
                    font-size: 1.25rem;
                    margin-bottom: 0;
                }
                main {
                    padding: 1rem;
                    margin-bottom: 1rem;
                }
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                #actions button {
                    margin: 0 0.25rem;
                    background: none;
                }

            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">Default Title</slot>                    
                </header>
                <main>
                    <slot></slot>
                </main>
                <footer id="actions">
                    <button>Cancel</button>
                    <button>Okay</button>
                </footer>
            </div>
        `;
        // const slots = this.shadowRoot.querySelectorAll('slot');
        // slots[1].addEventListener('slotchange', (event) => {
        //     console.dir(slots[1].assignedNodes());
        // });
    }

    connectedCallback() {
        const cancelButton = this.shadowRoot.querySelector('button:first-child');
        const confirmButton = this.shadowRoot.querySelector('button:last-child');
        
        cancelButton.addEventListener('click', () => {
            this.dispatchEvent(new Event('cancel'));
            this.close();
        });
        confirmButton.addEventListener('click', () => {
            this.dispatchEvent(new Event('confirm'));
            this.close();
        });
        this.shadowRoot.querySelector('#backdrop').addEventListener('click', () => {
            this.close();
        });
    }

    open() {
        this.setAttribute('opened', '');
    }
    close() {
        this.removeAttribute('opened');
    }
}

customElements.define('pk-modal', Modal);
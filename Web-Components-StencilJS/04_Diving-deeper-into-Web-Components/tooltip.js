class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = 'This is a default tooltip text.';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: rgba(0,0,0,0.85);
                    color: white;
                    position: absolute;
                    top: 2rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: .5rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }
                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }
                :host {
                    position: relative;
                }
                :host(.important) {
                    border-radius: 2px;
                    background-color: var(--color-primary, lightblue);
                }
                :host-context(p) {
                    font-weight: bold;
                }
                .icon {
                    background: black;
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 50%;
                    cursor: pointer;
                }
            </style>
            <slot>Some Default</slot>
            <span class="icon"> ?</span>
        `;
    }
    
    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text']; // tells JS to watch changes of the 'text' attribute
    }

    // clean up when component is removed from the DOM:
    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent= this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }
    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('pk-tooltip', Tooltip);
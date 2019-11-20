import style from "./index.scss";

enum DrawerPosition {
    TOP = "top",
    LEFT = "left",
    RIGHT = "right",
    BOTTOM = "bottom",
}

export default class SlideDrawer extends HTMLElement {
    public static get observedAttributes() {
        return ["open", "position"];
    }

    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>${style}</style>
            <div id="menu" data-position="${this.drawerPosition}">
                <slot></slot>
            </div>
            <div id="mask"></div>
        `;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.refMask = shadowRoot.querySelector<HTMLDivElement>("#mask")!;
        this.refMenu = shadowRoot.querySelector<HTMLDivElement>("#menu")!;
    }

    get open(): boolean {
        return JSON.parse(this.getAttribute("open") || "false");
    }

    set open(newState: boolean) {
        this.setAttribute("open", JSON.stringify(newState));
        newState ? this.dispatchEvent(this.openEvent) : this.dispatchEvent(this.closeEvent);
    }

    get drawerPosition(): DrawerPosition {
        return this.getAttribute("position") as DrawerPosition || this.defaultDrawerPosition;
    }

    set drawerPosition(newPosition: DrawerPosition) {
        this.setAttribute("position", newPosition);
    }

    public toggle():void {
        this.open = !this.open;
    }

    attributeChangedCallback(name: string, _oldVal: string, _newVal: string) {
        if (name === "position") {
            this.setDimensions();
        }
    }

    connectedCallback() {
        // init. 'open' attr.
        if (!this.getAttribute("open")) {
            this.setAttribute("open", "false");
        };
        this.refMask.addEventListener("click", () => this.toggle());
        window.addEventListener("resize", this.setDimensions)
    }

    // disconnecetdCallback() {}

    private defaultDrawerPosition: DrawerPosition = DrawerPosition.LEFT;
    private refMask: HTMLDivElement;
    private refMenu: HTMLElement;
    private openEvent: Event = new Event("slide-drawer-open", {bubbles: true, composed: true});
    private closeEvent: Event = new Event("slide-drawer-close", {bubbles: true, composed: true});

    private setDimensions = (): void => {
        this.open = false;
        this.refMenu.dataset.position = this.drawerPosition;
        this.style.setProperty("--windowInnerHeight", `${window.innerHeight}px`);
        this.style.setProperty("--windowInnerWidth", `${window.innerWidth}px`);
        switch (this.drawerPosition) {
            case DrawerPosition.LEFT:
                this.style.setProperty("--slide-length", `${-1 * this.refMenu.getBoundingClientRect().width}px`);
                break;
            case DrawerPosition.RIGHT:
                    this.style.setProperty("--slide-length", `${window.innerWidth - this.refMenu.getBoundingClientRect().width}px`);
                break;
            case DrawerPosition.BOTTOM:
                    this.style.setProperty("--slide-length", `${window.innerHeight - this.refMenu.getBoundingClientRect().height}px`);
                break;
            case DrawerPosition.TOP:
                    this.style.setProperty("--slide-length", `${-1 * this.refMenu.getBoundingClientRect().height}px`);
                break;
            default:
                this.style.setProperty("--slide-length", `${-1 * this.refMenu.getBoundingClientRect().width}px`);
                break;
        }
    }

}

window.customElements.define("slide-drawer", SlideDrawer);

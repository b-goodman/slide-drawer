var css = ":host{--slide-length:-300px;--windowInnerWidth:0px;--windowInnerHeight:0px}:host #mask{top:0;left:0;display:none;background-color:rgba(0,0,0,.5);opacity:0;width:100vw;height:100vh;z-index:998;position:absolute;transition:opacity .4s ease-out}:host #menu{display:block;position:absolute;z-index:999;background:#fff}:host #menu[data-position=left]{border-right:1px solid #000;left:var(--slide-length)}:host #menu[data-position=left],:host #menu[data-position=right]{top:0;height:100vh;width:300px;overflow-y:auto;transition:left .4s ease-out}:host #menu[data-position=right]{border-left:1px solid #000;left:var(--windowInnerWidth)}:host #menu[data-position=top]{top:var(--slide-length);left:0;width:100vw;border-bottom:1px solid #000;transition:top .4s ease-out}:host #menu[data-position=bottom]{top:var(--windowInnerHeight);left:0;width:100vw;overflow-x:auto;border-top:1px solid #000;transition:top .4s ease-out}:host ::slotted(div){margin:10px}:host([open=true]) #mask{display:unset;opacity:.5}:host([open=true]) #menu[data-position=left]{left:0}:host([open=true]) #menu[data-position=right]{left:var(--slide-length)}:host([open=true]) #menu[data-position=top]{top:0;border-bottom:1px solid #000}:host([open=true]) #menu[data-position=bottom]{top:var(--slide-length);border-bottom:1px solid #000}";

var DrawerPosition;
(function (DrawerPosition) {
    DrawerPosition["TOP"] = "top";
    DrawerPosition["LEFT"] = "left";
    DrawerPosition["RIGHT"] = "right";
    DrawerPosition["BOTTOM"] = "bottom";
})(DrawerPosition || (DrawerPosition = {}));
class SlideDrawer extends HTMLElement {
    constructor() {
        super();
        this.defaultDrawerPosition = DrawerPosition.LEFT;
        this.openEvent = new Event("slide-drawer-open", { bubbles: true, composed: true });
        this.closeEvent = new Event("slide-drawer-close", { bubbles: true, composed: true });
        this.setDimensions = () => {
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
        };
        const template = document.createElement('template');
        template.innerHTML = `
            <style>${css}</style>
            <div id="menu" data-position="${this.drawerPosition}">
                <slot></slot>
            </div>
            <div id="mask"></div>
        `;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.refMask = shadowRoot.querySelector("#mask");
        this.refMenu = shadowRoot.querySelector("#menu");
    }
    static get observedAttributes() {
        return ["open", "position"];
    }
    get open() {
        return JSON.parse(this.getAttribute("open") || "false");
    }
    set open(newState) {
        this.setAttribute("open", JSON.stringify(newState));
        newState ? this.dispatchEvent(this.openEvent) : this.dispatchEvent(this.closeEvent);
    }
    get drawerPosition() {
        return this.getAttribute("position") || this.defaultDrawerPosition;
    }
    set drawerPosition(newPosition) {
        this.setAttribute("position", newPosition);
    }
    toggle() {
        this.open = !this.open;
    }
    attributeChangedCallback(name, _oldVal, _newVal) {
        if (name === "position") {
            this.setDimensions();
        }
    }
    connectedCallback() {
        if (!this.getAttribute("open")) {
            this.setAttribute("open", "false");
        }
        this.refMask.addEventListener("click", () => this.toggle());
        window.addEventListener("resize", this.setDimensions);
    }
}
window.customElements.define("slide-drawer", SlideDrawer);

export default SlideDrawer;

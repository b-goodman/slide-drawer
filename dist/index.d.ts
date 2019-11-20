declare enum DrawerPosition {
    TOP = "top",
    LEFT = "left",
    RIGHT = "right",
    BOTTOM = "bottom"
}
declare class SlideDrawer extends HTMLElement {
    static get observedAttributes(): string[];
    constructor();
    get open(): boolean;
    set open(newState: boolean);
    get drawerPosition(): DrawerPosition;
    set drawerPosition(newPosition: DrawerPosition);
    toggle(): void;
    attributeChangedCallback(name: string, _oldVal: string, _newVal: string): void;
    connectedCallback(): void;
    private defaultDrawerPosition;
    private refMask;
    private refMenu;
    private openEvent;
    private closeEvent;
    private setDimensions;
}

export default SlideDrawer;

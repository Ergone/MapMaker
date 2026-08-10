export class InputManager {

    constructor(canvas, camera,tools, onChange) {

        this.canvas = canvas;
        this.camera = camera;
        this.tools = tools;
        this.onChange = onChange;

        this.dragging = false;

        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.init();
    }

    init() {

        this.canvas.addEventListener(
            "mousedown",
            event => this.mouseDown(event)
        );

        this.canvas.addEventListener(
            "mousemove",
            event => this.mouseMove(event)
        );

        this.canvas.addEventListener(
            "mouseup",
            () => this.mouseUp()
        );

        this.canvas.addEventListener(
            "mouseleave",
            () => this.mouseUp()
        );

        this.canvas.addEventListener(
            "wheel",
            event => this.wheel(event),
            { passive: false }
        );

        this.tools.menu.addEventListener(
            "click",
            event => this.toolClick(event)
        )
    }

    mouseDown(event) {

        this.dragging = true;

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    }

    mouseMove(event) {

        if (!this.dragging) {
            return;
        }

        const dx = event.clientX - this.lastMouseX;
        const dy = event.clientY - this.lastMouseY;

        this.camera.move(dx, dy);

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;

        this.onChange();
    }

    mouseUp() {
        this.dragging = false;
    }

    wheel(event) {

        event.preventDefault();

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        /** Position dans le monde avant le zoom */
        const worldBefore =
            this.camera.screenToWorld(mouseX, mouseY);

        /** Nouveau zoom */
        const factor =
            event.deltaY < 0 ? 1.1 : 0.9;

        const newZoom =
            this.camera.zoom * factor;

        this.camera.setZoom(newZoom);

        /** Conserver le point sous la souris */
        this.camera.offsetX =
            mouseX -
            worldBefore.x *
            this.camera.unite *
            this.camera.zoom;

        this.camera.offsetY =
            mouseY +
            worldBefore.y *
            this.camera.unite *
            this.camera.zoom;

        this.onChange();
    }

    toolClick(event) {
        this.tools.createMenu(event);
    }
}
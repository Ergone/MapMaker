export class InputManager {

    constructor(grid, camera,tools, onChange) {

        this.grid = grid;
        this.canvas = grid.canvas;
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

        this.canvas.addEventListener(
            "click",
            event => this.click(event),
        );

        this.tools.menu.addEventListener(
            "click",
            event => this.menuClick(event)
        );

        this.tools.modif.addEventListener(
            "click",
            event => this.modifClick(event)
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

    click(event) {
        if(this.grid.mode === "Point") {
            const rect = this.canvas.getBoundingClientRect();

            // Coordonnées brutes du clic par rapport au coin haut-gauche du canvas HTML
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Application de la formule inverse (dé-zoom et dé-décalage)
            const worldX = (mouseX - this.camera.offsetX) / this.camera.getStep();
            const worldY = (mouseY - this.camera.offsetY) / this.camera.getStep();

            const gridX = Math.floor(worldX);
            const gridY = Math.floor(worldY);

            this.grid.carre.push({ x: gridX, y: gridY });

            this.grid.draw();
        }
    }

    menuClick(event) {
        this.tools.createMenu(event);
    }

    modifClick(event) {
        this.tools.createModif(event);
        const point = document.getElementById('modif-list').children[0];
        point.addEventListener(
            "click",
            event => this.addModePoint(event,point)
        )
    }

    addModePoint(event, point) {
        if (point.style.backgroundColor === "green") {
            point.style.removeProperty("background-color");
            this.grid.mode = "";
        } else {
            point.style.backgroundColor = "green";
            this.grid.mode = "Point";
        }

    }
}
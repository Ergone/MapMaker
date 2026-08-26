export class Camera {

    constructor() {
        this.offsetX = window.innerWidth / 2;
        this.offsetY = window.innerHeight / 2;

        this.zoom = 10;
        this.unite = 1;
    }

    worldToScreen(x, y) {
        return {
            x: this.offsetX + x * this.unite * this.zoom,
            y: this.offsetY - y * this.unite * this.zoom
        };
    }

    screenToWorld(x, y) {
        return {
            x: (x - this.offsetX) / (this.unite * this.zoom),
            y: -(y - this.offsetY) / (this.unite * this.zoom)
        };
    }

    move(dx, dy) {
        this.offsetX += dx;
        this.offsetY += dy;
    }

    setZoom(zoom) {
        this.zoom = Math.max(2.5, Math.min(zoom, 50));
    }

    getStep() {
        return this.unite * this.zoom;
    }
}
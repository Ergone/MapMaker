export class Grid {

    constructor(canvas, camera) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.camera = camera;

        this.width = 0;
        this.height = 0;
        this.mode = "";
        this.carre = [];
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    draw() {

        const ctx = this.ctx;
        const camera = this.camera;

        ctx.clearRect(0, 0, this.width, this.height);

        const step = camera.getStep();

        /** Grille */
        ctx.strokeStyle = "#e5e5e5";
        ctx.lineWidth = 1;

        let startX = camera.offsetX % step;

        for (let x = startX; x < this.width; x += step) {

            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        let startY = camera.offsetY % step;

        for (let y = startY; y < this.height; y += step) {

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        /** Axe X */
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(0, camera.offsetY);
        ctx.lineTo(this.width, camera.offsetY);
        ctx.stroke();

        /** Axe Y */
        ctx.beginPath();
        ctx.moveTo(camera.offsetX, 0);
        ctx.lineTo(camera.offsetX, this.height);
        ctx.stroke();

        this.carre.forEach(p =>{ // Pas fini clairement

            const screenX = camera.offsetX + (p.x * step);
            const screenY = camera.offsetY + (p.y * step);

            ctx.fillRect(screenX, screenY, 1, 1);
            ctx.strokeRect(screenX, screenY, 1, 1);

            ctx.fillStyle = p.color;
            ctx.fillRect(Math.trunc(screenX), Math.trunc(screenY), camera.zoom, camera.zoom);

            ctx.strokeStyle = p.color;  // Couleur du contour
            ctx.lineWidth = 1;
            ctx.strokeRect(Math.trunc(screenX), Math.trunc(screenY), camera.zoom, camera.zoom);
        })
    }
}
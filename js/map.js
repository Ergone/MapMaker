const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
const coordinates = document.getElementById("coordinates");

let width;
let height;

/*
 * Position du repère dans le canvas
 */
let offsetX = window.innerWidth / 2;
let offsetY = window.innerHeight / 2;

/*
 * Zoom
 */
let zoom = 1;

/*
 * Taille d'une unité
 */
const unite = 50;


/* =========================
   Redimensionnement
   ========================= */

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    draw();
}

window.addEventListener("resize", resize);


/* =========================
   Conversion coordonnées
   ========================= */

function worldToScreen(x, y) {
    return {
        x: offsetX + x * unite * zoom,
        y: offsetY - y * unite * zoom
    };
}

function screenToWorld(x, y) {
    return {
        x: (x - offsetX) / (unite * zoom),
        y: -(y - offsetY) / (unite * zoom)
    };
}


/* =========================
   Création de la carte
   ========================= */

function draw() {

    ctx.clearRect(0, 0, width, height);

    /*
     * Grille
     */

    ctx.strokeStyle = "#e5e5e5";
    ctx.lineWidth = 1;

    const step = unite * zoom;

    /*
     * Lignes verticales
     */
    let startX = offsetX % step;

    for (let x = startX; x < width; x += step) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    /*
     * Lignes horizontales
     */
    let startY = offsetY % step;

    for (let y = startY; y < height; y += step) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }


    /*
     * Axe X
     */

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(width, offsetY);
    ctx.stroke();


    /*
     * Axe Y
     */

    ctx.beginPath();
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, height);
    ctx.stroke();


    /*
     * Graduations X
     */

    ctx.fillStyle = "#333";
    ctx.font = "10px Arial";

    for (let x = startX; x < width; x += step) {

        const worldX = Math.round((x - offsetX) / step);

        if (worldX !== 0) {
            ctx.fillText(
                worldX,
                x + 3,
                offsetY + 15
            );
        }
    }


    /*
     * Graduations Y
     */

    for (let y = startY; y < height; y += step) {

        const worldY = Math.round((offsetY - y) / step);

        if (worldY !== 0) {
            ctx.fillText(
                worldY,
                offsetX + 5,
                y - 5
            );
        }
    }
}


/* =========================
   Déplacement
   ========================= */

let dragging = false;

let lastMouseX;
let lastMouseY;

canvas.addEventListener("mousedown", event => {

    dragging = true;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});


canvas.addEventListener("mousemove", event => {

    /*
     * Coordonnées monde sous la souris
     */

    const position = screenToWorld(
        event.clientX,
        event.clientY
    );

    coordinates.textContent =
        `X: ${position.x.toFixed(2)}   ` +
        `Y: ${position.y.toFixed(2)}   ` +
        `Zoom: ${zoom.toFixed(2)}`;


    /*
     * Pan
     */

    if (dragging) {

        const dx = event.clientX - lastMouseX;
        const dy = event.clientY - lastMouseY;

        offsetX += dx;
        offsetY += dy;

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        draw();
    }
});


canvas.addEventListener("mouseup", () => {
    dragging = false;
});

canvas.addEventListener("mouseleave", () => {
    dragging = false;
});


/* =========================
   Zoom
   ========================= */

canvas.addEventListener("wheel", event => {

    event.preventDefault();

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    /*
     * Coordonnée monde avant zoom
     */
    const worldBefore = screenToWorld(mouseX, mouseY);

    /*
     * Zoom
     */
    const factor = event.deltaY < 0 ? 1.1 : 0.9;

    zoom *= factor;

    zoom = Math.max(0.1, Math.min(zoom, 10));


    /*
     * On garde le point sous la souris
     */
    offsetX =
        mouseX - worldBefore.x * unite * zoom;

    offsetY =
        mouseY + worldBefore.y * unite * zoom;

    draw();
});


resize();
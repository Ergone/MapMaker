import { Camera } from "./Camera.js";
import { Grid } from "./Grid.js";
import { InputManager } from "./InputManager.js";
import { Coordinate } from "./Coordinate.js";
import { Tools } from "./Tools.js";

const canvas = document.getElementById("grid");

/** Création des objets */
const camera = new Camera();
const grid = new Grid(canvas, camera);
const coordinates = new Coordinate(document.getElementById("coordinates"));
// Bar d'outils permettants de modifier les interactions sur le canvas
const tools = new Tools(document.getElementById("tools"),
                                document.getElementById("menu"),
                                document.getElementById("modif"));

/** Redessin */
function draw() {
    grid.draw();
}

/** Gestion souris */
new InputManager(
    grid,
    camera,
    tools,
    draw
);

/** Affichage coordonnées */
canvas.addEventListener(
    "mousemove",
    event => {

        const position =
            camera.screenToWorld(
                event.clientX,
                event.clientY
            );

        coordinates.changeTextContent(
            `X: ${position.x.toFixed(2)}   ` +
                `Y: ${position.y.toFixed(2)}   ` +
                `Zoom: ${camera.zoom.toFixed(2)}`)
    }
);

/** Redimensionnement */
window.addEventListener(
    "resize",
    () => {

        grid.resize();
        draw();
    }
);

/** Initialisation */
grid.resize();
draw();
export class Coordinate {

    constructor(div) {
        this.div = div;
    }

    changeTextContent(text) {
        this.div.textContent = text;
    }
}
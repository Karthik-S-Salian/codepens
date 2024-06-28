/**type HTMLMainElement */
const main = document.querySelector("main");
/**type HTMLDivElement */
const trail = document.querySelector(".trail");

let prvsX = 0;
let prvsY = 0;
const delta = 1;

/**
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

main?.addEventListener("mousemove", event => {
    const x = event.offsetX;
    const y = event.offsetY;

    const d =Math.max(Math.floor(distance(x, y, prvsX, prvsY)/delta),1);

    const dx= (x-prvsX)/d;
    const dy = (y-prvsY)/d;

    prvsX = x;
    prvsY = y;

    for (let i = 0; i < d; i++) {
        const newTrail = document.createElement("div");
        newTrail.classList.add("trail");
        newTrail.style.left = `${x+i*dx}px`;
        newTrail.style.top = `${y+i*dy}px`;

        main.appendChild(newTrail)
        setTimeout(() => {
            main.removeChild(newTrail);
        }, 100)
    }
})

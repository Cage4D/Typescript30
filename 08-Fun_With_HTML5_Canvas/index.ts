const canvas = document.querySelector<HTMLCanvasElement>("#draw");
if (!canvas) throw new Error("Canvas element not found!");

const ctx = canvas?.getContext("2d");
if (!ctx) throw new Error("2D Context not supported");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";

let isDrawing = false
let lastX = 0;
let lastY = 0;

function draw(e:MouseEvent) {
    if (!isDrawing) return;
    console.log(e)
    ctx?.beginPath();
    ctx?.moveTo(lastX, lastY);
    ctx?.lineTo(e.offsetX, e.offsetY);
    ctx?.stroke();
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);
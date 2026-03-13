const canvas = document.querySelector<HTMLCanvasElement>("#draw");
if (!canvas) throw new Error("Canvas element not found!");

const ctx = canvas?.getContext("2d");
if (!ctx) throw new Error("2D Context not supported");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;

let isDrawing = false
let lastX = 0;
let lastY = 0;
let hue:number = 0;
let direction = true;

function draw(e:MouseEvent) {
    if (!isDrawing) return;
    console.log(e)
    ctx!.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx?.beginPath();
    ctx?.moveTo(lastX, lastY);
    ctx?.lineTo(e.offsetX, e.offsetY);
    ctx?.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY]
    hue++;
    hue %= 360
    if (ctx!.lineWidth >= 200 || ctx!.lineWidth <= 1) {
        direction = !direction
    }
    direction ? ctx!.lineWidth++ : ctx!.lineWidth--;
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
});
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);
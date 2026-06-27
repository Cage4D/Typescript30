const video = document.querySelector<HTMLVideoElement>('.player');
const canvas = document.querySelector<HTMLCanvasElement>('.photo');
const ctx = canvas!.getContext('2d');
const strip = document.querySelector<HTMLDivElement>('.strip');
const snap = document.querySelector<HTMLAudioElement>('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        console.log(localMediaStream)
        video!.srcObject = localMediaStream;
        video?.play()
    })
    .catch(err => {
        console.error(`OH NO!!!`, err)
    })
}

function paintToCanvas() {
    const width = video!.videoWidth;
    const height = video!.videoHeight;
    canvas!.width = width;
    canvas!.height = height;

    return setInterval(() => {
        ctx?.drawImage(video!, 0, 0, width, height)
        let pixels = ctx?.getImageData(0, 0, width, height)
        if (pixels) {
            pixels = rgbSplit(pixels)
            ctx?.putImageData(pixels, 0, 0)
        }
    }, 16)
}

function takePhoto() {
    snap!.currentTime = 0
    snap!.play()

    const data = canvas?.toDataURL("image/jpeg")
    if (!data) return;

    const link = document.createElement("a")
    link.href = data
    link.setAttribute("download", "handsome")
    link.innerHTML = `<img src=${data} alt="Handsome man">`
    strip?.insertBefore(link, strip.firstChild)
}

function redEffect(pixels: ImageData): ImageData {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels;
}

function rgbSplit(pixels: ImageData): ImageData {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];
        pixels.data[i + 500] = pixels.data[i + 1];
        pixels.data[i - 550] = pixels.data[i + 2];
    }
    return pixels;
}

interface ColorLevels {
    rmin: number;
    rmax: number;
    gmin: number;
    gmax: number;
    bmin: number;
    bmax: number;
}

function greenScreen(pixels: ImageData): ImageData {
    const levels: Partial<ColorLevels> = {};

    document.querySelectorAll<HTMLInputElement>('.rgb input').forEach((input) => {
        levels[input.name as keyof ColorLevels] = Number(input.value);
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i + 0];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];

        if (
            red >= (levels.rmin ?? 0) &&
            green >= (levels.gmin ?? 0) &&
            blue >= (levels.bmin ?? 0) &&
            red <= (levels.rmax ?? 255) &&
            green <= (levels.gmax ?? 255) &&
            blue <= (levels.bmax ?? 255)
        ) {
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();
video?.addEventListener("canplay", paintToCanvas)
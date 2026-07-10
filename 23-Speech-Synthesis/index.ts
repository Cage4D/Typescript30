const msg = new SpeechSynthesisUtterance();
let voices: SpeechSynthesisVoice[] = [];

const voicesDropdown = document.querySelector<HTMLSelectElement>('[name="voice"]');
const options = document.querySelectorAll<HTMLInputElement>('[type="range"], [name="text"]');
const speakButton = document.querySelector<HTMLButtonElement>('#speak');
const stopButton = document.querySelector<HTMLButtonElement>('#stop');
const textInput = document.querySelector<HTMLInputElement | HTMLTextAreaElement>('[name="text"]');

if (textInput) {
    msg.text = textInput.value;
}

function populateVoices(): void {
    voices = speechSynthesis.getVoices();
    if (!voicesDropdown) return;

    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes("en"))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

function setVoice(this: HTMLSelectElement): void {
    const selected = voices.find(voice => voice.name === this.value);
    if (selected) {
        msg.voice = selected;
    }
    toggle();
}

function toggle(startOver: boolean = true): void {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption(this: HTMLInputElement): void {
    console.log(this.name, this.value);

    switch (this.name) {
        case "text":
            msg.text = this.value;
            break;
        case "rate":
            msg.rate = parseFloat(this.value);
            break;
        case "pitch":
            msg.pitch = parseFloat(this.value);
            break;
        case "volume":
            msg.volume = parseFloat(this.value);
            break;
    }

    toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown?.addEventListener("change", setVoice);
options.forEach(option => option.addEventListener("change", setOption));
speakButton?.addEventListener("click", () => toggle());
stopButton?.addEventListener("click", () => toggle(false));
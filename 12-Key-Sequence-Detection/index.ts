import "./cornify.js";

const pressed: string[] = [];
const secretCode = "johnnycage";

declare function cornify_add(): void;

window.addEventListener("keyup", (e: KeyboardEvent) => {
    pressed.push(e.key);

    pressed.splice(
        -secretCode.length - 1,
        pressed.length - secretCode.length
    );

    if (pressed.join("").includes(secretCode)) {
        console.log("DING DING!");
        cornify_add();
    }

    console.log(pressed);
});
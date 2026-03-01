const inputs = document.querySelectorAll<HTMLInputElement>(".controls input")

function handleUpdate(this:HTMLInputElement):void {
    const suffix = this.dataset.sizing ?? "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
    console.log(suffix)
}

inputs.forEach(input => input.addEventListener("change", handleUpdate))
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate))
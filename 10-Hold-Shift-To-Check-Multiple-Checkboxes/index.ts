const checkboxes = document.querySelectorAll<HTMLInputElement>(".inbox input[type='checkbox']")

let lastChecked:HTMLInputElement | null = null;

function handleCheck(e:MouseEvent) {
    const target = e.currentTarget as HTMLInputElement;
    
    let inBetween:boolean = false;
    if (e.shiftKey && target.checked) {
        checkboxes.forEach(checkbox => {
            if (checkbox === target || checkbox === lastChecked) {
                inBetween = !inBetween;
            }
            if (inBetween) checkbox.checked = true;
        })
    }

    lastChecked = target;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", handleCheck)
})
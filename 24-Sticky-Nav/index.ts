const nav = document.querySelector<HTMLElement>("#main");

if (nav) {
    const topOfNav: number = nav.offsetTop;

    const fixNav = (): void => {
        if (window.scrollY >= topOfNav) {
            document.body.style.paddingTop = `${nav.offsetHeight}px`;
            document.body.classList.add("fixed-nav");
        } else {
            document.body.classList.remove("fixed-nav");
            document.body.style.paddingTop = "0";
        }
    };

    window.addEventListener("scroll", fixNav);
} else {
    console.warn('Element with id "main" was not found.');
}
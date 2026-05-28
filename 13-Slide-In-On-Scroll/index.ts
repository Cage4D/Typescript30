function debounce(
  func: (...args: any[]) => void,
  wait: number = 20,
  immediate: boolean = true
) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    const context = this;

    const later = function () {
      timeout = null as any;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

const sliderImages = document.querySelectorAll(".slide-in") as NodeListOf<HTMLImageElement>;

function checkSlide() {
  sliderImages.forEach((sliderImage) => {
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;

    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
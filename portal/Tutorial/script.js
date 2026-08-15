const slider = document.querySelector(".slider");
const list = document.querySelector(".list");
const thumbnail = document.querySelector(".thumbnail");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

/*--- Auto Play ---*/
let runAutoPlay = setTimeout(() => {
  next.click();
}, 9000);

next.addEventListener("click", () => {
  initSlider("next");
});

prev.addEventListener("click", () => {
  initSlider("prev");
});

const initSlider = (type) => {
  const sliderItems = list.querySelectorAll(".item");
  const thumbnailItems = thumbnail.querySelectorAll(".item");
  if (type === "next") {
    list.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
  } else {
    const lastItemsPosition = slider.length - 1;
    list.prepend(sliderItems[lastItemsPosition]);
    thumbnail.prepend(thumbnailItems[lastItemsPosition]);
    slider.classList.add("prev");
  }
  setTimeout(() => {
    slider.classList.remove("next");
    slider.classList.remove("prev");
  }, 2000);

  clearTimeout(runAutoPlay);
  runAutoPlay = setTimeout(() => {
    next.click();
  }, 9000);
};

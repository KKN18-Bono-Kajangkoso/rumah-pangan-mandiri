const slides = document.querySelectorAll(".slide");
const currentSlideElement = document.getElementById("currentSlide");
const totalSlidesElement = document.getElementById("totalSlides");
const progressBar = document.getElementById("progressBar");
const dotsContainer = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let isAnimating = false;

/* ==========================================
   SET TOTAL SLIDES
========================================== */

totalSlidesElement.textContent = String(slides.length).padStart(2, "0");

/* ==========================================
   CREATE DOT NAVIGATION
========================================== */

slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Slide ${index + 1}`);

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        goToSlide(index);
    });

    dotsContainer.appendChild(dot);
});

/* ==========================================
   UPDATE SLIDE
========================================== */

function updateSlide(newIndex, direction = "next") {
    if (isAnimating || newIndex === currentSlide) {
        return;
    }

    isAnimating = true;

    const oldSlide = slides[currentSlide];
    const newSlide = slides[newIndex];

    slides.forEach((slide) => {
        slide.classList.remove("active", "exit-left");
    });

    /* Animasi slide lama */
    if (direction === "next") {
        oldSlide.classList.add("exit-left");
    } else {
        oldSlide.style.transform = "translateX(70px)";
        oldSlide.style.opacity = "0";
    }

    /* Posisi awal slide baru */
    newSlide.style.transform =
        direction === "next"
            ? "translateX(70px)"
            : "translateX(-70px)";

    newSlide.style.opacity = "0";

    setTimeout(() => {
        newSlide.classList.add("active");

        newSlide.style.transform = "";
        newSlide.style.opacity = "";
    }, 50);

    currentSlide = newIndex;

    setTimeout(() => {
        updateUI();
        isAnimating = false;
    }, 500);
}

/* ==========================================
   NEXT SLIDE
========================================== */

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        updateSlide(currentSlide + 1, "next");
    }
}

/* ==========================================
   PREVIOUS SLIDE
========================================== */

function prevSlide() {
    if (currentSlide > 0) {
        updateSlide(currentSlide - 1, "prev");
    }
}

/* ==========================================
   GO TO SPECIFIC SLIDE
========================================== */

function goToSlide(index) {
    if (index < 0 || index >= slides.length) {
        return;
    }

    const direction =
        index > currentSlide ? "next" : "prev";

    updateSlide(index, direction);
}

/* ==========================================
   UPDATE UI
========================================== */

function updateUI() {
    /* Counter */
    currentSlideElement.textContent =
        String(currentSlide + 1).padStart(2, "0");

    /* Progress Bar */
    const progress =
        ((currentSlide + 1) / slides.length) * 100;

    progressBar.style.width = `${progress}%`;

    /* Dots */
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentSlide
        );
    });

    /* Previous Button */
    prevBtn.disabled = currentSlide === 0;

    /* Next Button */
    if (currentSlide === slides.length - 1) {
        nextBtn.disabled = true;

        nextBtn.querySelector("span").textContent =
            "Selesai";
    } else {
        nextBtn.disabled = false;

        nextBtn.querySelector("span").textContent =
            "Selanjutnya";
    }

    /* Scroll ke atas ketika ganti slide */
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* ==========================================
   KEYBOARD NAVIGATION
========================================== */

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        prevSlide();
    }
});

/* ==========================================
   SWIPE SUPPORT MOBILE
========================================== */

let touchStartX = 0;
let touchEndX = 0;

const sliderWrapper =
    document.querySelector(".slider-wrapper");

sliderWrapper.addEventListener(
    "touchstart",
    (event) => {
        touchStartX =
            event.changedTouches[0].screenX;
    },
    { passive: true }
);

sliderWrapper.addEventListener(
    "touchend",
    (event) => {
        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();
    },
    { passive: true }
);

function handleSwipe() {
    const swipeDistance =
        touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    /* Swipe kiri = next */
    if (swipeDistance < 0) {
        nextSlide();
    }

    /* Swipe kanan = previous */
    else {
        prevSlide();
    }
}

/* ==========================================
   INITIAL UI
========================================== */

updateUI();
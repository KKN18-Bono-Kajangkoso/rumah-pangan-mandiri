window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if(window.scrollY > 100){
        header.style.background = "#1b5e20";
    }else{
        header.style.background = "#2e7d32";
    }
});

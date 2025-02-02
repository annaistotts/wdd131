document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector("#menu-btn"); 
    const menu = document.querySelector("nav"); 
  
    function toggleMenu() {
      menu.classList.toggle("show");
    }
  
    menuButton.addEventListener("click", toggleMenu);
});

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 1000) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
}

function viewHandler(event) {
    const clickedImage = event.target;
  
    const imageSrc = clickedImage.src;   
    const altText = clickedImage.alt;
  
    const fullImageSrc = imageSrc.replace("-sm", "-full"); 
  
    const modalHTML = viewerTemplate(fullImageSrc, altText);
    document.body.insertAdjacentHTML("afterbegin", modalHTML);
  
    const closeButton = document.querySelector(".close-viewer");
    closeButton.addEventListener("click", closeViewer);
}
  
function closeViewer() {
    const viewer = document.querySelector(".viewer");
    viewer.remove();  
}
  
  
const images = document.querySelectorAll(".gallery img");
images.forEach(image => {
    image.addEventListener("click", viewHandler);  
});

handleResize();
window.addEventListener("resize", handleResize);

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${pic}" alt="${alt}">
      </div>`;
}
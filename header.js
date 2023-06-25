const images = [
    './assets/images/capuchinFinalBW.png',
    './assets/images/chimpanzeeFinalBW.png',
    './assets/images/gorillaFinalBW.png',
    './assets/images/lemurFinalBW.png',
    './assets/images/mandrillFinalBW.png',
    './assets/images/marmosetFinalBW.png',
    './assets/images/orangutanFinalBW.png',
    './assets/images/squirrelMonkeyFinalBW.png'
]


let currentImageIndex = 0; 
let slideElement = document.getElementById('slide');
let nextSlideElement = document.getElementById('nextSlide');

// Preload images
let imageElements = images.map(function(src) {
  let img = new Image();
  img.src = src;
  return img;
});

function rotateSlide() {
  // Assign next image to "next slide"
  nextSlideElement.style.backgroundImage = 'url(' + imageElements[(currentImageIndex + 1) % images.length].src + ')';
  
  // Fade in "next slide" and fade out current slide
  nextSlideElement.style.opacity = '1';
  slideElement.style.opacity = '0';

  // After transition ends, switch roles of "slide" and "next slide"
  setTimeout(function() {
    slideElement.style.backgroundImage = 'url(' + imageElements[(currentImageIndex + 1) % images.length].src + ')';
    slideElement.style.opacity = '1';
    nextSlideElement.style.opacity = '0';
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }, 1000);
}

// Rotate slide every 3 seconds
setInterval(rotateSlide, 5000);

// Initialize with first image
slideElement.style.backgroundImage = 'url(' + imageElements[0].src + ')';

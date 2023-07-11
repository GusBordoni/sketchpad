const gridContainer = document.querySelector('.grid-container');
let pixelCount = 256;

for (let i = 0; i < pixelCount; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    gridContainer.appendChild('pixel');
}



/* pixel.forEach(pixel => gridPixel.addEventListener('click', console.log('ok'))); */


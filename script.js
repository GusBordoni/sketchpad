const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridValue = document.querySelector('#grid-value');
const slider = document.querySelector('#slider');
let pixelCount = slider.value;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


function setGrid(n){
    for (let i = 0; i < n**2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        gridContainer.appendChild(pixel);
        pixel.addEventListener('mouseover', changeColor);
        pixel.addEventListener('mousedown', changeColor);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${pixelCount},1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${pixelCount},1fr)`;
}

setGrid(pixelCount);

let pixels = document.querySelectorAll('.pixel');

function clearGrid(){
    gridContainer.innerHTML = '';
}

slider.addEventListener('change', function(){
    setTimeout(() => {
        clearGrid();
        pixelCount = slider.value;
        setGrid(pixelCount);
    }, 500);
})

slider.addEventListener('input', function(){
    gridValue.textContent = slider.value;
})







function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (e.type === 'mousedown' || mouseDown) {
        e.target.style.backgroundColor = 'black';
    }
}


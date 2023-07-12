const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridValue = document.querySelector('#grid-value');
const slider = document.querySelector('#slider');
let pixelCount = 256;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

slider.addEventListener('change', function(){
    setTimeout(() => {
        pixels.forEach(pixel => {
            pixel.remove();
        })
        console.log('all removed');
        /* console.log('renova grid ' + Math.ceil((slider.value/2)**2));
        pixelCount = Math.ceil((slider.value/2)**2);
        setGrid(pixelCount); */
        console.log('atempting to add '+ pixelCount + ' pixels now');
        setGrid(32);
    }, 2000);
})

slider.addEventListener('input', function(){
    gridValue.textContent = slider.value;
})



function setGrid(n){
    for (let i = 0; i < n; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        gridContainer.appendChild(pixel);
        pixel.addEventListener('mouseover', changeColor);
        pixel.addEventListener('mousedown', changeColor);
    }
}
setGrid(16);

let pixels = document.querySelectorAll('.pixel');

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (e.type === 'mousedown' || mouseDown) {
        e.target.style.backgroundColor = 'black';
    }
}


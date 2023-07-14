const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridValue = document.querySelector('#grid-value');
const slider = document.querySelector('#slider');
const palettePicker = document.querySelector('#colorPalletes');
let pixelBGColor = '#FFFFFF';
let pickedColor = '#000000';
let pixelCount = slider.value;
let mouseDown = false;
let currentMode = 'color'
const colorModes = {
    rainbow: ['#ff2b32', '#ea7317', '#ffca3aff', '#8ac926ff', '#1982c4ff', '#6a4c93ff'],
    warm: ["#780116","#f7b538","#db7c26","#d8572a","#c32f27"],
    cold: ["#004e64","#00a5cf","#9fffcb","#25a18e","#9a99f7"],
    psychedelic: ["#fe5b63","#ff7cbb","#ffdb7c","#5bf495","#80b4ff"],
    warmncold: ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"],
    xmas: ["#386641","#6a994e","#a7c957","#f2e8cf","#bc4749"]
}

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

function clearPainting(){
    clearGrid();
    setGrid(pixelCount);
}

function eraser(){
    if(pickedColor != '#FFFFFF'){
        pickedColor = '#FFFFFF';
    } else pickedColor = colorPicker.value;
}

function toggleGridLines(){
    gridContainer.classList.toggle('gridContainerGap');
};

// slider update
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

colorPicker.addEventListener("change", function(){
    pickedColor = colorPicker.value;
    currentMode = 'color';
    palettePicker.value = 'color';
});

palettePicker.addEventListener('change', () => {
    const selectedMode = palettePicker.value;
    if(palettePicker.value === 'color'){
        currentMode = 'color';
    } else currentMode = colorModes[selectedMode];
});

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (e.type === 'mousedown' || mouseDown) {
        /* e.target.style.backgroundColor = pickedColor; */
        if(currentMode === 'color'){
            e.target.style.backgroundColor = pickedColor;
        } else {
            e.target.style.backgroundColor = currentMode[Math.floor(Math.random() * currentMode.length)];
        }
    }
}


const gridContainer = document.querySelector('#grid-container');
const gridSlider = document.querySelector('#grid-slider');
const gridValue = document.querySelector('#grid-value');
const slider = document.querySelector('#slider');
const palettePicker = document.querySelector('#colorPalletes');
const gridCheckbox = document.getElementById('gridCheckbox');
const eraserCheckbox = document.getElementById('eraserCheckbox');
const darkerCheckbox = document.getElementById('darkerCheckbox');
let pixelBGColor = '#FFFFFF';
let pickedColor = '#000000';
let pixelCount = slider.value;
let mouseDown = false;
let currentMode = 'color'
let tempMode = currentMode;
const colorModes = {
    rainbow: ['#ff2b32', '#ea7317', '#ffca3aff', '#8ac926ff', '#1982c4ff', '#6a4c93ff'],
    warm: ["#780116","#f7b538","#db7c26","#d8572a","#c32f27"],
    cold: ["#004e64","#00a5cf","#9fffcb","#25a18e","#9a99f7"],
    psychedelic: ["#fe5b63","#ff7cbb","#ffdb7c","#5bf495","#80b4ff"],
    warmncold: ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"],
    xmas: ["#386641","#6a994e","#a7c957","#f2e8cf","#bc4749"],
    modern: ["#a76d23","#814c32","#eee9e1","#3d5a6c","#212121","#636466","#a5a6aa"],
    grayscale: ["#f8f9fa","#e9ecef","#dee2e6","#ced4da","#adb5bd","#6c757d","#495057","#343a40","#212529"]
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
    if(currentMode != 'eraser' && currentMode != 'darker'){
        pickedColor = '#FFFFFF';
        tempMode = currentMode;
        currentMode = 'eraser';
        darkerCheckbox.checked = false;
    } else if(currentMode === 'darker'){
        tempMode = 'color';
        currentMode = 'eraser';
        darkerCheckbox.checked = false;
    } else {
        pickedColor = colorPicker.value;
        currentMode = tempMode;
        // volta pro que tava antes
    }
}

function darker(){
    if(currentMode != 'darker' && currentMode != 'eraser'){
        tempMode = currentMode;
        currentMode = 'darker';
        eraserCheckbox.checked = false;
    } else if(currentMode === 'eraser'){
        tempMode = 'color';
        currentMode = 'darker';
        eraserCheckbox.checked = false;
    } else {
        pickedColor = colorPicker.value;
        currentMode = tempMode;
    }
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
    eraserCheckbox.checked = false;
    darkerCheckbox.checked = false;
    palettePicker.selectedIndex = 0;
});

palettePicker.addEventListener('change', () => {
    const selectedMode = palettePicker.value;
    if(palettePicker.value === 'color'){
        eraserCheckbox.checked = false;
        darkerCheckbox.checked = false;
        currentMode = 'color';
        pickedColor = colorPicker.value;
    } else currentMode = colorModes[selectedMode];
});

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (e.type === 'mousedown' || mouseDown) {
        /* e.target.style.backgroundColor = pickedColor; */
        if(currentMode === 'color' || currentMode === 'eraser'){
            e.target.style.backgroundColor = pickedColor;
        } else if(currentMode === 'darker'){
            let colorArray = getBgColor(e.target.style.backgroundColor);
            console.log(colorArray);
            darkerColor(colorArray)
            console.log(colorArray);

        } else {
            e.target.style.backgroundColor = currentMode[Math.floor(Math.random() * currentMode.length)];
        }
    }
}

let tempdiv = document.querySelector('#grid-container > div:nth-child(89)');

function getBgColor(color){
    return color.slice(4, -1).split(', ');
}

function darkerColor(arr){
    if(arr[0] >= 229.5) arr[0] = 255; else arr[0] = Number(arr[0]) + 25.5;
    if(arr[1] >= 229.5) arr[1] = 255; else arr[1] = Number(arr[1]) + 25.5;
    if(arr[2] >= 229.5) arr[2] = 255; else arr[2] = Number(arr[2]) + 25.5;
    return arr;
}
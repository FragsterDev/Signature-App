let history = [];

const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const fontSizePicker = document.getElementById('fontSizePicker');

const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function startDrawing(x, y) {
    isDrawing = true;
    lastX = x;
    lastY = y;
}

function draw(x, y) {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastX = x;
        lastY = y;
    }
}

function stopDrawing() {
    isDrawing = false;
}

// Mouse events
canvas.addEventListener('mousedown', (event) => startDrawing(event.offsetX, event.offsetY));
canvas.addEventListener('mousemove', (event) => draw(event.offsetX, event.offsetY));
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events
canvas.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling when drawing
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener('touchend', stopDrawing);

fontSizePicker.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});

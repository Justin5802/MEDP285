const shapesContainer = document.querySelector('.falling-shapes-container');

function createShape() {
    const shape = document.createElement('div');
    shape.classList.add('shape');

    // Randomize shape size and color
    const size = Math.random() * 50 + 20; 
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.backgroundColor = getRandomColor();
    
    // Position the shape at a random horizontal position
    shape.style.left = `${Math.random() * 100}vw`;

    // Apply falling animation
    shape.style.animation = `fall ${Math.random() * 2 + 3}s linear forwards`;

    shapesContainer.appendChild(shape);

    // Remove shape after animation ends
    shape.addEventListener('animationend', () => {
        shapesContainer.removeChild(shape);
    });
}

function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create shapes at intervals
setInterval(createShape, 500); 

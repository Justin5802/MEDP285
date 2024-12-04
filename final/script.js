const square = document.querySelector('.moving-square');
const message = document.getElementById('catch-message');

let catchCount = 0; // Initialize the catch counter

// Function to get random position
function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 100); 
    const y = Math.random() * (window.innerHeight - 100); 
    return { x, y };
}

// Function to change color
function changeColor() {
    const colors = ['blue', 'orange', 'green', 'red', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to handle mouse enter
function handleMouseEnter() {
    const { x, y } = getRandomPosition();
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;
    square.style.backgroundColor = changeColor();

    // Increment the catch counter
    catchCount++;

    // Check if the counter has reached 25
    if (catchCount === 25) {
        message.innerHTML = "Great job! You caught the square!"; 
        square.removeEventListener('mouseenter', handleMouseEnter); 
        square.textContent = "☹️";
        square.style.fontSize = "50px"; 
        square.style.color = "black"; 
        square.style.display = "flex"; 
        square.style.alignItems = "center"; 
        square.style.justifyContent = "center"; 
        
        square.addEventListener('click', () => {
            square.style.display = "none"; 
            message.innerHTML = "Oh my god, you just murdered that square! It was already caught, what is wrong with you??? "; // Update the message
            
            
            const restartButton = document.createElement('button'); 
            restartButton.textContent = "RESTART";
            restartButton.style.marginLeft = "10px"; 
            message.appendChild(restartButton); 
            
            restartButton.addEventListener('click', restartGame); 
        });
    }
}

// Function to restart the game
function restartGame() {
    catchCount = 0; 
    message.innerHTML = ""; 
    square.style.display = "flex";
    square.style.left = "50%"; 
    square.style.top = "50%";
    square.style.transform = "translate(-50%, -50%)"; 
    square.textContent = ""; 

    square.addEventListener('mouseenter', handleMouseEnter); 
}

// Add event listener for mouse enter
square.addEventListener('mouseenter', handleMouseEnter);

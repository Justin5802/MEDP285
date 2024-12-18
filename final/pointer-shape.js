document.addEventListener('mousemove', (e) => {

    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        document.body.appendChild(cursor);
    }


    cursor.style.left = `${e.pageX - 15}px`; 
    cursor.style.top = `${e.pageY - 15}px`;  
});


function changeCursorColor() {
    const cursor = document.getElementById('custom-cursor');
    const colors = ['#F39C12', '#3498DB', '#E74C3C', '#9B59B6', '#1ABC9C'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    cursor.style.backgroundColor = randomColor;
}


setInterval(changeCursorColor, 2000);

document.body.style.cursor = 'none';

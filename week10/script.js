function dragElement(canvasElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    canvasElement.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();
        console.log(e);
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        canvasElement.style.top = (canvasElement.offsetTop - pos2) + 'px';
        canvasElement.style.left = (canvasElement.offsetLeft - pos1) + 'px';
    }

    function stopElementDrag() {
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

dragElement(document.getElementById('shape1'));
dragElement(document.getElementById('shape2'));
dragElement(document.getElementById('shape3'));
dragElement(document.getElementById('shape4'));
dragElement(document.getElementById('shape5'));
dragElement(document.getElementById('shape6'));
dragElement(document.getElementById('shape7'));
dragElement(document.getElementById('shape8'));
dragElement(document.getElementById('shape9'));
dragElement(document.getElementById('shape10'));
dragElement(document.getElementById('shape11'));
dragElement(document.getElementById('shape12'));
dragElement(document.getElementById('shape13'));
dragElement(document.getElementById('shape14'));
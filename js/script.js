document.addEventListener('DOMContentLoaded', () => {

    let current = null;

    // Tracking current shape
    document.querySelectorAll('#shape-btn input').forEach(button => {
        button.addEventListener('click', () => {
            current = button.value;
        });
    });

    

    let canvas = document.getElementById("board");
    const context = canvas.getContext('2d');
    let canvasX = 0;
    let canvasY = 0;
    let clicked = false;

    canvas.addEventListener("click", () => {

        clicked = !clicked;
        console.log("click");
    });

    canvas.addEventListener("mousemove", function(e) {

        // If the user has already clicked then start tracking mouse
        if (clicked){
            console.log(e.pageX, e.pageY);
        }        
    });
});


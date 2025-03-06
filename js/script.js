let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

document.addEventListener('DOMContentLoaded', () => {

    let current = null;

    // Tracking current shape
    document.querySelectorAll('#shape-btn input').forEach(button => {
        button.addEventListener('click', () => {
            current = button.value;
        });
    });

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    let clicked = false;

    canvas.addEventListener("click", function(e) {

        clicked = !clicked;

        if (clicked)
        {
            startX = e.pageX - canvas.offsetLeft;
            startY = e.pageY - canvas.offsetTop;
            console.log(startX,startY);
        }
        else{
            endX = e.pageX - canvas.offsetLeft;
            endY = e.pageY - canvas.offsetTop;

            console.log(endX, endY);

            draw(context);
        }

    });
});

function draw(context)
{
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX,endY);
    context.stroke();
}


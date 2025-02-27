document.addEventListener('DOMContentLoaded', () => {
    

    document.querySelectorAll('body button').forEach(button => {

        button.addEventListener('click', () => {
            draw(button.id)
        });

    });
});

function draw(shape){
    switch (shape.toLowerCase()){
        case "reset":
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            break;

    }
}
document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById("canvas");

    document.querySelectorAll('body button').forEach(button => {


        button.addEventListener('click', () => {
            draw(button.id)
        });
    });


    function draw(shape) {
        switch (shape.toLowerCase()){
            case "reset":
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                break;

        }
    }
});
class Triangle {
    constructor(sideLength, color) {
        this.sideLength = sideLength;
        this.color = color;
    }

}

class Circle {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
    }
}

class Square {
    constructor(width, color) {
        this.width = width;
        this.color = color;
    }
}

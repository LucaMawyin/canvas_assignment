document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById("canvas");

    class Triangle {

        constructor(sideLength, strokeColor, fillColor) {
            this.sideLength = sideLength;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
            
        }
        draw () {
            canvas.strokeStyle = this.strokeColor;
            canvas.fillStyle = this.fillColor;

        }
        
    
    }
    
    class Circle {
        constructor(radius, strokeColor, fillColor) {
            this.radius = radius;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;        
        }
    }
    
    class Square {
        constructor(width, strokeColor, fillColor) {
            this.width = width;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;       
        }
    }
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


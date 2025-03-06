
document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById("board");
    const context = canvas.getContext('2d');

    class Triangle {

        constructor(x, y, sideLength, strokeColor, fillColor) {
            this.sideLength = sideLength;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
            
        }
        draw () {
            context.strokeStyle = this.strokeColor;
            context.fillStyle = this.fillColor;
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(59, 50);
            context.lineTo(0, 0);
            context.stroke();

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

    let test = new Triangle (0, 0, 10, "rgb(255, 255, 255)", "rgb(255, 255, 255)");
    test.draw();
    function draw(shape) {
        switch (shape.toLowerCase()){
            case "reset":
                
                context.clearRect(0, 0, canvas.width, canvas.height);
      
                console.log("sad");
                break;
        }
    }
});


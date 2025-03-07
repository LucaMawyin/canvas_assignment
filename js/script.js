
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("canvas");

    const ctx = canvas.getContext('2d');

    canvas.height = ctx["canvas"].clientHeight;
    canvas.width = ctx["canvas"].clientWidth;

    let current = null;

    // Tracking current shape
    document.querySelectorAll('#shape-btn input').forEach(button => {
        button.addEventListener('click', () => {
            current = button.value;
        });
    });

    let drawHistory = [];

    class Triangle {

        constructor(x, y, sideLength, strokeColor, fillColor) {
            this.sideLength = sideLength;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;

        }
        draw() {
            ctx.strokeStyle = this.strokeColor;
            ctx.fillStyle = this.fillColor;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(59, 50);
            ctx.lineTo(0, 0);
            ctx.stroke();

        }


    }

    class Circle {
        constructor(x, y, width, height, strokeColor, fillColor) {
            this.radius = radius;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
        }
    }

    class Rectangle {
        constructor(x, y, width, height, strokeColor, fillColor) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
        }
        draw() {
            ctx.strokeStyle = this.strokeColor;
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }
    }
 
    document.querySelectorAll('body button').forEach(button => {


        button.addEventListener('click', () => {
            draw(button.id)
        });

    });

   
    function draw(shape) {
        switch (shape.toLowerCase()) {
            case "reset":

                context.clearRect(0, 0, canvas.width, canvas.height);

                break;
        }
    }
    // Ensure canvas has a proper size

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    let drawing = false;

    function getMousePos(e) {
 
        const rect = canvas.getBoundingClientRect();
        console.log(canvas.width);
        console.log(canvas.height)
        return {
            x: Math.floor(e.clientX - rect.left),
            y: Math.floor(e.clientY - rect.top)
        };
    }
    let startPoint = 0;
    let endPoint = 0;


    // Gets height, width from 2 points
    function calcDimensions(point1, point2) {

        const w = (point2.x - point1.x);
        const h = (point2.y - point1.y);

        return {
            width: w,
            height: h
        }
    }



    function startDraw(e) {
        drawing = true;
        startPoint = getMousePos(e);
        canvas.addEventListener("mousemove", draw);


    }

    function draw(e) {
        if (!drawing) return;


        const pos = getMousePos(e);

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function stopDraw(e) {
        if (drawing) {
            drawing = false;
            endPoint = getMousePos(e);
             
            switch (current) {
                case "Rectangle": 
                    console.log("rect");
                    const dim = calcDimensions(startPoint, endPoint);
                    const rect = new Rectangle(startPoint.x, startPoint.y, dim.width, dim.height, "rgb(255, 255, 255)", "rgb(255, 255, 255)");
                    rect.draw();
                    drawHistory.push(rect);
                    break;
    
    
            }
      
            canvas.removeEventListener("mousemove", draw);
            ctx.beginPath(); // Reset path to avoid connecting new strokes
        }

    }

    // Set drawing properties
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    // Event listeners
    canvas.addEventListener("mousedown", startDraw);
    
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
});


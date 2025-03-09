
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("canvas");

    const ctx = canvas.getContext('2d');

    let current = {
        shape: "",
        borderColor: "",
        shapeColor: "",
        width: "",
        height: ""
    };

    const resizeCanvas = () => {
        canvas.width = window.innerWidth * 0.75;
        canvas.height = window.innerHeight * 0.75;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';

        offsetX = canvas.offsetLeft;
        offsetY = canvas.offsetTop;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


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
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(59, 50);
            ctx.lineTo(0, 0);
            ctx.stroke();
        }
        clear() {
            ctx.strokeStyle = "gray";
            ctx.fillStyle = "gray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
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
        clear() {
            ctx.strokeStyle = "gray";
            ctx.fillStyle = "gray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    // Set up edit buttons with listeners
    document.querySelectorAll('#edit-btn input').forEach(button => {
        button.addEventListener('click', () => {
            edit(button.value)
        });

    });


    // Tracking current shape
    document.querySelectorAll('#shape-btn input').forEach(button => {
        button.addEventListener('click', () => {
            current.shape = button.value;
        });
    });

    document.querySelectorAll('#preference-btn input').forEach(box => {
        switch (box.id.toLowerCase()) {
            case "border-color":
                box.addEventListener("input", () => {current.borderColor = box.value});
                break;
            case "shape-color":
                box.addEventListener("input", () => {current.shapeColor = box.value});
                break;
            case "width":
                box.addEventListener("input", () => {current.width = Math.abs(parseInt(box.value))});
                break;
            case "height":
                box.addEventListener("input", () => {current.height = Math.abs(parseInt(box.value))});
                break;
        }
    });
    // For edit buttons
    function edit(name) {

        switch (name.toLowerCase()) {
            case "reset":
                clear();
                break;

            case "undo":
                undo();
                break;
        }
    }
    // Ensure canvas has a proper size

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;





    document.querySelectorAll('body button').forEach(button => {


        button.addEventListener('click', () => {
            edit(button.value)
        });

    });


  
    // Ensure canvas has a proper size

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    let drawing = false;

    function getMousePos(e) {

        const rect = canvas.getBoundingClientRect();
        return {
            x: Math.floor(e.clientX - rect.left),
            y: Math.floor(e.clientY - rect.top)
        };
    }

    let startPoint = 0;
    let endPoint = 0;


    function clear() {
        drawHistory = [];
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function undo() {
        let last = drawHistory.pop();
        last.clear();
        drawHistory[drawHistory.length - 1].draw();
    }

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
        // set to be able to draw
        drawing = true;

        // define a starting point for drawing
        startPoint = getMousePos(e);

        // add event listener for drawing
      
        canvas.addEventListener("mousemove", draw);


    }

    function draw(e) {

        if (!drawing) return;

        const pos = getMousePos(e);
        switch (current.shape) {
             // current has properties: current.borderColor, current.fillColor, current.width, current.length
            case "Rectangle":
                // put code for creating new rect
                break;     
            case "Triangle":
                // put code for creating new triangle
                break;
            case "Circle":
                // put code for creating new circle
                break;
            case "Brush":
                
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                break;
        }
  
    }

    function stopDraw(e) {
        if (drawing) {
            drawing = false;
            endPoint = getMousePos(e);

            // Decide what shape based on current selected

            switch (current.shape) {
                case "Rectangle":
                    console.log("rect");
                    const dim = calcDimensions(startPoint, endPoint);
                    const rect = new Rectangle(startPoint.x, startPoint.y, dim.width, dim.height, "rgb(0, 0, 0)", "rgb(0, 0, 0)");
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


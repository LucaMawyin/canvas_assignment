document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    let offsetX;
    let offsetY;

    // Setting canvas size here
    // Wonky cursor stuff happens when styled in css
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

    // Init values
    let current = null;
    let drawing = false;

    // Tracking current shape
    document.querySelectorAll('#shape-btn input').forEach(button => {
        button.addEventListener('click', () => {

            switch(button.value){
                case "Triangle":
                    current = new Triangle(canvas, ctx);
                    break;
                case "Square":
                    current = new Square(canvas, ctx);
                    break;
                case "Circle":
                    current = new Circle(canvas, ctx);
                    break;
            }
        });
    });

    // Drawing shape
    canvas.addEventListener("mousedown", e => {

        if (current == null) return;

        if (!drawing) current.startDraw(e);
        else current.stopDraw(e);

        drawing = !drawing;
    });

    // Updating shape on mousemove
    canvas.addEventListener("mousemove", e => {
        if (!drawing) return;

        current.stopDraw(e);
    });
});

class Triangle{
    constructor (canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.startX;
        this.startY;
        this.endX;
        this.endY;
    }

    startDraw(e){
        this.startX = e.clientX;
        this.startY = e.clientY;
        console.log("Start:", this.startX, this.startY);
    }

    stopDraw(e){
        this.endX = e.clientX;
        this.endY = e.clientY;
        console.log("End:", this.endX, this.endY);
    }
}

class Square{
    constructor (canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.startX;
        this.startY;
        this.endX;
        this.endY;
    }

    startDraw(e){
        this.startX = e.clientX;
        this.startY = e.clientY;
        console.log("Start:", this.startX, this.startY);
    }

    stopDraw(e){
        this.endX = e.clientX;
        this.endY = e.clientY;
        console.log("End:", this.endX, this.endY);
    }
}

class Circle{
    constructor (canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.startX;
        this.startY;
        this.endX;
        this.endY;
        this.drawing = false;
        this.savedCanvas=null;
    }

    startDraw(e){

        // Setting initial points
        const rect = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;

        // Saving current state of board
        this.drawing = true;
        this.savedCanvas = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    stopDraw(e){
        this.drawing = false;
        this.updateShape(e);
    }

    updateShape(e){

        // Getting endpoints
        const rect = this.canvas.getBoundingClientRect();
        this.endX = e.clientX - rect.left;
        this.endY = e.clientY - rect.top;

        // Calculating circle values
        this.radius = (1/2)*Math.sqrt((this.endX - this.startX)**2 + (this.endY - this.startY)**2);
        this.centreX = (1/2)*(this.startX+this.endX);
        this.centreY = (1/2)*(this.startY+this.endY);

        // Restoring old canvas before adding new shape
        this.ctx.putImageData(this.savedCanvas, 0, 0);

        // Printing final shape onto canvas
        this.ctx.beginPath();
        this.ctx.arc(this.centreX,this.centreY,this.radius,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.beginPath();
    }
}
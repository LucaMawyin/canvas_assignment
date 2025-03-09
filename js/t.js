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

    let startX, startY;
    let endX, endY;

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
            console.log(current.constructor.name);
        });
    });

    function drawLine(){
        ctx.lineTo(startX, startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.beginPath();
    }

    canvas.addEventListener("mousedown", e => {
        if (!drawing){
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;

            console.log("Start Position:", startX, startY); 
            ctx.lineTo(startX, startY);       
            drawing = true;    
        }

        else{

            endX = e.clientX - offsetX;
            endY = e.clientY - offsetY;

            console.log("End Position:", endX, endY);

            ctx.stroke();
            ctx.beginPath();         
            
            drawLine();
            
            drawing = false;
        }
    });

    canvas.addEventListener("mousemove", e => {


        if(!drawing) return;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY);
        ctx.stroke();
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
    }

    startDraw(e){
        const rect = this.canvas.getBoundingClientRect();

        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        console.log("Start:", this.startX, this.startY);
    }

    stopDraw(e){
        const rect = this.canvas.getBoundingClientRect();
        this.endX = e.clientX - rect.left;
        this.endY = e.clientY - rect.top;
        console.log("End:", this.endX, this.endY);
    }
}
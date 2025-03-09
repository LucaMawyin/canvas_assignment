document.addEventListener("DOMContentLoaded", () => {

    let shapeList = JSON.parse(localStorage.getItem("shapeList")) || [];    

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    let savedCanvas = null;

    let offsetX;
    let offsetY;

    // Shape objects
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
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            this.drawing = true;
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    
        stopDraw(e){
            this.drawing = false;
            this.updateShape(e);
        }
    }
    
    class Square{
        constructor (){
            this.startX;
            this.startY;
            this.endX;
            this.endY;
            this.drawing = false;
        }
    
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            this.drawing = true;
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    
        stopDraw(e){
            this.drawing = false;
            this.updateShape(e);
        }
    
        updateShape(e){
            const rect = canvas.getBoundingClientRect();
            this.endX = e.clientX - rect.left;
            this.endY = e.clientY - rect.top;        
    
            // Restoring old canvas before adding new shape
            ctx.putImageData(savedCanvas, 0, 0);
    
            // Calculating values
            this.width = this.endX-this.startX;
            this.height = this.endY-this.startY;
    
            ctx.beginPath();
            ctx.rect(this.startX,this.startY,this.width,this.height);
            ctx.stroke();
            ctx.beginPath();
        }
    
        loadShape(){
            ctx.beginPath();
            ctx.rect(this.startX,this.startY,this.width,this.height);
            ctx.stroke();
            ctx.beginPath();        
        }
    }
    
    class Circle{
        constructor (){
            this.startX;
            this.startY;
            this.endX;
            this.endY;
            this.drawing = false;
        }
    
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            this.drawing = true;
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    
        stopDraw(e){
            this.drawing = false;
            this.updateShape(e);
        }
    
        updateShape(e){
    
            // Getting endpoints
            const rect = canvas.getBoundingClientRect();
            this.endX = e.clientX - rect.left;
            this.endY = e.clientY - rect.top;
    
            // Calculating circle values
            this.radius = (1/2)*Math.sqrt((this.endX - this.startX)**2 + (this.endY - this.startY)**2);
            this.centreX = (1/2)*(this.startX+this.endX);
            this.centreY = (1/2)*(this.startY+this.endY);
    
            // Restoring old canvas before adding new shape
            ctx.putImageData(savedCanvas, 0, 0);
    
            // Printing final shape onto canvas
            ctx.beginPath();
            ctx.arc(this.centreX,this.centreY,this.radius,0,2*Math.PI);
            ctx.stroke();
            ctx.beginPath();
        }
    
        loadShape(){
            ctx.beginPath();
            ctx.arc(this.centreX,this.centreY,this.radius,0,2*Math.PI);
            ctx.stroke();
            ctx.beginPath();        
        }
    }

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
        else {
            current.stopDraw(e);
            shapeList.push(current);
            console.log(shapeList);
            localStorage.setItem("shapeList", JSON.stringify(shapeList));
        }

        drawing = !drawing;
    });

    // Updating shape on mousemove
    canvas.addEventListener("mousemove", e => {
        if (!drawing) return;
        current.stopDraw(e);
        
    });
});
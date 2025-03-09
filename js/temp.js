document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    let savedCanvas = null;

    let borderWidth = localStorage.getItem('borderWidth') || 2;
    let borderColour = localStorage.getItem('borderColour') || "#000000";
    let shapeColour = localStorage.getItem('shapeColour') || "#FFFFFF";

    document.getElementById("border-colour").value = borderColour;
    document.getElementById("border-width").value = borderWidth;
    document.getElementById("shape-colour").value = shapeColour;

    let offsetX;
    let offsetY;

    // Shape objects
    class Triangle{
        constructor (){
            this.type = "Triangle"
            this.startX;
            this.startY;
            this.endX;
            this.endY;
            this.shapeColour = shapeColour;
            this.borderColour = borderColour;
            this.borderWidth = borderWidth;
        }
    
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            this.drawing = true;
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });
        }
    
        stopDraw(e){
            this.drawing = false;
            this.updateShape(e);
        }
    }
    
    class Square{
        constructor (){
            this.type = "Square"
            this.startX;
            this.startY;
            this.endX;
            this.endY;
            this.shapeColour = shapeColour;
            this.borderColour = borderColour;
            this.borderWidth = borderWidth;
        }
    
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });
        }
    
        stopDraw(e){
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
            ctx.fillStyle = this.shapeColour;
            ctx.lineWidth = this.borderWidth;
            ctx.fill();

            ctx.strokeStyle = this.borderColour;
            ctx.stroke();
            ctx.beginPath();
        }
    
        loadShape(){
            ctx.beginPath();
            ctx.rect(this.startX,this.startY,this.width,this.height);

            ctx.fillStyle = this.shapeColour;
            ctx.lineWidth = this.borderWidth;
            ctx.fill();

            ctx.strokeStyle = this.borderColour;
            ctx.stroke();
            ctx.beginPath();        
        }
    }
    
    class Circle{
        constructor (){
            this.type = "Circle"
            this.startX;
            this.startY;
            this.endX;
            this.endY;
            this.shapeColour = shapeColour;
            this.borderColour = borderColour;
            this.borderWidth = borderWidth;
        }
    
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });
        }
    
        stopDraw(e){
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

            ctx.fillStyle = this.shapeColour;
            ctx.lineWidth = this.borderWidth;
            ctx.fill();

            ctx.strokeStyle = this.borderColour;
            ctx.stroke();
            ctx.beginPath();      
        }
    
        loadShape(){
            ctx.beginPath();
            ctx.arc(this.centreX,this.centreY,this.radius,0,2*Math.PI);

            ctx.fillStyle = this.shapeColour;
            ctx.lineWidth = this.borderWidth;
            ctx.fill();

            ctx.strokeStyle = this.borderColour;
            ctx.stroke();
            ctx.beginPath();           
        }
    }

    class Brush{
        constructor (){
            this.type = "Brush"
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
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });

            ctx.beginPath();
            ctx.lineTo(this.startX, this.startY);
        }

        draw(e) {
            if (!this.drawing) return;
    
            const rect = canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
    
            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(currentX, currentY);
            ctx.lineWidth = this.borderWidth;
            ctx.strokeStyle = this.borderColour;
            ctx.stroke();
    
            this.lastX = currentX;
            this.lastY = currentY;
        }

        stopDraw(e){
            this.drawing = false;
        }

        // These need to be here because they get called automatically
        updateShape(){}
        loadShape(){}
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

    // Loading objects from localStorage
    let shapeList = JSON.parse(localStorage.getItem("shapeList")) || [];
    shapeList = shapeList.map(shape => {

        // Basically just recreating objects
        // Objects dissapear after code is stopped
        switch (shape.type) {
            case "Square":
                let square = new Square();
                Object.assign(square, shape);
                return square;
            case "Circle":
                let circle = new Circle();
                Object.assign(circle, shape);
                return circle;
            case "Triangle":
                let triangle = new Triangle();
                Object.assign(triangle, shape);
                return triangle;
            case "Brush":
                let brush = new Brush();
                Object.assign(brush, shape);
                return brush;
        }
    });

    shapeList.forEach(shape => shape.loadShape());


    document.querySelector("#edit-btn input[value='Undo']").addEventListener("click", () => {
        shapeList.pop();
        localStorage.setItem("shapeList", JSON.stringify(shapeList));
        ctx.clearRect(0,0,canvas.width,canvas.height);
        shapeList.forEach(shape => shape.loadShape())


    });
    document.querySelectorAll('#preference-btn input').forEach(box => {
        switch (box.id.toLowerCase()) {
            case "border-colour":
                box.addEventListener("input", () => {
                    borderColour = box.value;
                    current.borderColour = borderColour;
                    localStorage.setItem('borderColour', borderColour);
                });
                break;
            case "shape-colour":
                box.addEventListener("input", () => {
                    shapeColour = box.value;
                    current.shapeColour = shapeColour;
                    localStorage.setItem('shapeColour', shapeColour);
                });
                break;
            case "border-width":
                box.addEventListener("input", () => {
                    borderWidth = box.value;
                    current.borderWidth = parseInt(borderWidth);
                    localStorage.setItem('borderWidth', borderWidth);
                });
                break;
        }
    });
    
    // Tracking current shape
    document.querySelectorAll('#shape-btn input').forEach(button => {
        button.addEventListener('click', () => {

            switch(button.value){
                case "Triangle":
                    current = new Triangle();
                    break;
                case "Square":
                    current = new Square();
                    break;
                case "Circle":
                    current = new Circle();
                    break;

                case "Brush":
                    current = new Brush();
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

            if  (current instanceof Triangle)
                current = new Triangle();
            else if (current instanceof Square)
                current = new Square();
            else if (current instanceof Circle)
                current = new Circle();
            else if (current instanceof Brush)
                current = new Brush();
            
            localStorage.setItem("shapeList", JSON.stringify(shapeList));
        }

        drawing = !drawing;
    });

    // Updating shape on mousemove
    canvas.addEventListener("mousemove", e => {
        if (!drawing) return;

        if (current instanceof Brush) {
            current.draw(e);
        }
        else{
            current.stopDraw(e);
        }
    });

    // User wants to reset the board
    const resetAlert = document.getElementById("reset-board");
    document.querySelector("#edit-btn input[value='Reset']").addEventListener("click", () => {
        localStorage.removeItem('shapeList');
        localStorage.removeItem('borderColour');
        localStorage.removeItem('borderWidth');
        localStorage.removeItem('shapeColour');
        borderWidth = 2;
        borderColour = "#000000";
        shapeColour = "#FFFFFF";
        shapeList = [];
        current = null;
        document.getElementById("border-colour").value = borderColour;
        document.getElementById("border-width").value = borderWidth;
        document.getElementById("shape-colour").value = shapeColour;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        resetAlert.showModal();
    });

    document.querySelector('#reset-board button').addEventListener('click', () => {
        resetAlert.close();
    })
});
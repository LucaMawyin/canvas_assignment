/**
 * Luca Mawyin, 400531739
 * Neelan Thurairajah, 400581985
 * March 4, 2025
 * Script file that lets users draw on canvas
 */

document.addEventListener("DOMContentLoaded", () => {

    // Canvas data
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    let savedCanvas = null;

    // Accessing stored data
    let borderWidth = localStorage.getItem('borderWidth') || 2;
    let borderColour = localStorage.getItem('borderColour') || "#000000";
    let shapeColour = localStorage.getItem('shapeColour') || "#FFFFFF";

    document.getElementById("border-colour").value = borderColour;
    document.getElementById("border-width").value = borderWidth;
    document.getElementById("shape-colour").value = shapeColour;

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

        /**
        * Gets initial points to start drawing
        *
        * @param {Event} e
        * @returns void
        */
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });
        }

        /**
        * stops drawing 
        *
        * @param {Event} e
        * @returns void
        */
        stopDraw(e){
            this.updateShape(e);
        }
    
        /**
        * Gets final positions and creates shape based on endpoints
        *
        * @param {Event} e
        * @returns void
        */
        updateShape(e){
            const rect = canvas.getBoundingClientRect();
            this.endX = e.clientX - rect.left;
            this.endY = e.clientY - rect.top;        
            // Restoring old canvas before adding new shape
            ctx.putImageData(savedCanvas, 0, 0);
    
            // Calculating values
            this.width = this.endX-this.startX;
            this.height = this.endY-this.startY;
    
            this.loadShape();
        }

        /**
        * Loads shape using already stored values
        *
        * @param {}
        * @returns void
        */
        loadShape() {
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.endX, this.startY);
            ctx.lineTo(this.startX, this.endY);
            ctx.closePath();
    
            ctx.fillStyle = this.shapeColour;
            ctx.fill();
    
            ctx.lineWidth = this.borderWidth;
            ctx.strokeStyle = this.borderColour;
            ctx.stroke();
        }
    }

    // Square class
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

        /**
        * Gets initial points to start drawing
        *
        * @param {Event} e
        * @returns void
        */
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });
        }

        /**
        * stops drawing 
        *
        * @param {Event} e
        * @returns void
        */
        stopDraw(e){
            this.updateShape(e);
        }
    
        /**
        * Gets final positions and creates shape based on endpoints
        *
        * @param {Event} e
        * @returns void
        */
        updateShape(e){
            const rect = canvas.getBoundingClientRect();
            this.endX = e.clientX - rect.left;
            this.endY = e.clientY - rect.top;        
            // Restoring old canvas before adding new shape
            ctx.putImageData(savedCanvas, 0, 0);
    
            // Calculating values
            this.width = this.endX-this.startX;
            this.height = this.endY-this.startY;
    
            this.loadShape();
        }

        /**
        * Loads shape using already stored values
        *
        * @param {}
        * @returns void
        */
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
    
    // Circle class
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

        /**
        * Gets initial points to start drawing
        *
        * @param {Event} e
        * @returns void
        */    
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
    
            // Saving current state of board
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });
        }

        /**
        * stops drawing 
        *
        * @param {Event} e
        * @returns void
        */    
        stopDraw(e){
            this.updateShape(e);
        }
    
        /**
        * Gets final positions and creates shape based on endpoints
        *
        * @param {Event} e
        * @returns void
        */        
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

        /**
        * Loads shape using already stored values
        *
        * @param {}
        * @returns void
        */
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

    // Brush object
    class Brush{
        constructor (){
            this.type = "Brush"
            this.points = [];
            this.drawing = false;
        }
        
        /**
        * Gets initial points to start drawing
        *
        * @param {Event} e
        * @returns void
        */        
        startDraw(e){
            // Setting initial points
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            // Saving current state of board
            this.drawing = true;
            savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height, { willReadFrequently: true });

            this.points.push({ x, y });

            ctx.beginPath();
            ctx.lineTo(this.startX, this.startY);
        }

        /**
        * Gets current points, adds to array, prints points
        *
        * @param {Event} e
        * @returns void
        */    
        draw(e) {
            if (!this.drawing) return;
    
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            // Draw each point and add to array to store
            ctx.beginPath();
            ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
            ctx.lineTo(x, y);
            ctx.lineWidth = this.borderWidth;
            ctx.strokeStyle = this.borderColour;
            ctx.stroke();
    
            this.points.push({x, y});
        }

        /**
        * Declaring the drawing as done
        *
        * @param {}
        * @returns void
        */   
        stopDraw(e){
            this.drawing = false;
        }

        // These need to be here because they get called automatically
        updateShape(){}

        /**
        * Loads shape based on already existing data within object
        *
        * @param {}
        * @returns void
        */    
        loadShape() {
            if (this.points.length < 2) return;
    
            ctx.beginPath();
            ctx.lineWidth = this.borderWidth;
            ctx.strokeStyle = this.borderColour;
    
            for (let i = 1; i < this.points.length; i++) {
                ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y);
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
    
            ctx.stroke();
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

    // Undo btn eventListener
    document.querySelector("#edit-btn input[value='Undo']").addEventListener("click", () => {
        shapeList.pop();
        localStorage.setItem("shapeList", JSON.stringify(shapeList));
        ctx.clearRect(0,0,canvas.width,canvas.height);
        shapeList.forEach(shape => shape.loadShape())
    });

    // Setting preferences for each input field
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

            // Showing which shape is currently active
            document.querySelectorAll('#shape-btn input').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');


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
        document.querySelectorAll('#shape-btn input').forEach(btn => btn.classList.remove('active'));
        resetAlert.showModal();
    });

    // Alert box close
    document.querySelector('#reset-board button').addEventListener('click', () => {
        resetAlert.close();
    })
});
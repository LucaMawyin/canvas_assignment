
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    // Ensure canvas has a proper size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let drawing = false;

function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        console.log(e.clientX - rect.left, e.clientY - rect.top);
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function startDraw(e) {
        drawing = true;
        const pos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x, pos.y); // Draw a small initial dot
        ctx.stroke();
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getMousePos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function stopDraw() {
        drawing = false;
        ctx.beginPath(); // Reset path to avoid connecting new strokes
    }

    // Set drawing properties
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    // Event listeners
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
});

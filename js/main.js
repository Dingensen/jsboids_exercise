function main(){
    let canvas = new Canvas({
        cvID: "boidsCanvas",
        width: 1000,
        height: 800
    });
    let update = new Loop({
        drawfps: 60,
        updatefps: 60,
        canvas: canvas.ctx,
        draw: draw,
    })
}

function Canvas(args){
    console.log("initialising canvas")

    this.canvas = document.getElementById(args.cvID);
    this.canvas.width = args.width;
    this.canvas.height = args.height;


    this.ctx = this.canvas.getContext("2d");
    this.ctx.width = args.width;
    this.ctx.height = args.height;
}

function draw(canvas,loop){
    loop.framecount += 1 //this should later go into the update loop

    canvas.fillStyle = "#EEEEEEEE";
    canvas.fillRect(0,0,canvas.width,canvas.height);

    canvas.strokestyle = "black"
    canvas.beginPath();
    canvas.arc(500+(100*Math.sin(0.01*loop.framecount)), 400+(100*Math.cos(0.01*loop.framecount)), 40, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();
}

function update(){

}

function Loop(args){
    this.framecount = 0;
    this.canvas = args.canvas || null;
    this.drawfps = args.drawfps || 60;
    this.updatefps = args.updatefps || 60;
    this.update = args.updateFunction;
    this.draw = args.drawFunction;

    this.updateLoop = setInterval(args.update, 1000/this.updatefps);
    this.drawLoop = setInterval(()=>{args.draw(this.canvas, this)}, 1000/this.fps);
}
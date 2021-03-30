function main(){
    let entities = [];

    let canvas = new Canvas({
        cvID: "boidsCanvas",
        width: 1000,
        height: 800
    });
    let update = new Loop({
        drawfps: 60,
        updatefps: 512,
        canvas: canvas.ctx,
        entities: entities,
        draw: drawFunction,
        update: updateFunction
    });


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

function drawFunction(canvas, entities){
    // loop.framecount += 1 //this should later go into the update loop

    canvas.fillStyle = "#EEEEEEEE";
    canvas.fillRect(0,0,canvas.width,canvas.height);

    for (const entity of entities){
        entity.draw(canvas);
    }


}

function updateFunction(entities){
    if (entities.length < 512){

        entities.push(
            new Entity({
                x: getRandomInt(1000), 
                y: getRandomInt(800), 
                rot: 0}
                )
            )

    }

}

function Loop(args){
    this.framecount = 0;
    this.canvas = args.canvas || null;
    this.drawfps = args.drawfps || 60;
    this.updatefps = args.updatefps || 60;
    // this.update = args.updateFunction;
    // this.draw = args.drawFunction;
    this.entities = args.entities;

    this.updateLoop = setInterval(()=>{args.update(this.entities)}, 1000/this.updatefps);
    this.drawLoop = setInterval(()=>{args.draw(this.canvas,this.entities ,this)}, 1000/this.fps);
}

class Entity{
    constructor(args){
        this.x = args.x;
        this.y = args.y;
        this.rot = args.rot;
    }
    
    draw(cv){
        cv.strokestyle = "black"
        cv.beginPath();
        cv.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
        cv.closePath();
        cv.stroke();
    }

    setXY(x,y){
        this.x = x;
        this.y = y;
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
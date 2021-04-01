function main(){


    let entities = [];

    let canvas = new Canvas({
        cvID: "boidsCanvas",
        width: 1000,
        height: 800
    });
    let update = new Loop({
        drawfps: 60,
        updatefps: 60,
        canvas: canvas.ctx,
        entities: entities,
        draw: drawFunction,
        update: updateFunction
    });

    const DOMcanvas = document.querySelector('canvas')
    DOMcanvas.addEventListener('mousedown',(e)=>{
        getCursorPosition(DOMcanvas, e, entities)
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

function drawFunction(canvas, entities){
    // loop.framecount += 1 //this should later go into the update loop

    canvas.fillStyle = "#FFFFFF";
    canvas.fillRect(0,0,canvas.width,canvas.height);

    for (const entity of entities){
        entity.draw(canvas);
    }


}

function updateFunction(canvas,entities){
    if (entities.length < 64){

        entities.push(
            new Boid({
                x: getRandomInt(1000), 
                y: getRandomInt(800), 
                rot: 0,
                id: entities.length,
            })
        )
    }
    for (entity of entities) {
        // entity.vector.rotateDeg((getRandomInt(3)-1)*5);

        // let factor = Math.random()+0.5;
        // let factorVec = new Victor(factor, factor);
        // entity.vector.add(factorVec);


        // entity.vector.x += (getRandomInt(3)-1)/100;
        // entity.vector.y += (getRandomInt(3)-1)/100;
        entity.updatePosition(canvas,entities);

        // console.log(entity.vector)
        // if(entity.getNeighbours(entities).length>1){
        //     console.log("peep")
        // }
    }

    // console.log(entities[0].getNeighbours(entities).length)

}

function Loop(args){
    this.framecount = 0;
    this.canvas = args.canvas || null;
    this.drawfps = args.drawfps || 60;
    this.updatefps = args.updatefps || 60;
    // this.update = args.updateFunction;
    // this.draw = args.drawFunction;
    this.entities = args.entities;

    this.updateLoop = setInterval(()=>{args.update(this.canvas,this.entities)}, 1000/this.updatefps);
    this.drawLoop = setInterval(()=>{args.draw(this.canvas,this.entities ,this)}, 1000/this.drawfps);
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

    getCoords(){
        return({x:this.x,y:this.y})
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCursorPosition(canvas, event, entities) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)

    entities.push(
        new Boid({
            x: x, 
            y: y, 
            rot: 0,
            id: entities.length,
        })
    )
}
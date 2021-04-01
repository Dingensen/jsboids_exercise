class Boid extends Entity {
    constructor(args){
        super(args)
        this.vector = args.vector || {x:0,y:0};

        this.geom = [
            {x:0    ,y:6  },
            {x:2  ,y:-2 },
            {x:-2 ,y:-2 },

        ]
    }
    draw(cv){
        cv.strokeStyle = "black"
        cv.fillStyle = "black"
        cv.beginPath();
        
        for(let i = 0; i<this.geom.length; i++){
            cv.lineTo(
                this.x+this.geom[i].x,
                this.y+this.geom[i].y
            )
        }
        
        cv.fill();
        cv.closePath();
        cv.stroke();
    }

    updatePosition(cv,x,y){
        if(!x && !y){
            this.x += this.vector.x
            this.y += this.vector.y
        } else {
            this.x = x
            this.y = y
        }
        //teleport entity back onto map
        let newCoords = this.getCoords();
        if(newCoords.x < 0){this.x = cv.width-newCoords.x};
        if(newCoords.y < 0){this.y = cv.height-newCoords.y};
        if(newCoords.x > cv.width){this.x = newCoords.x-cv.width};
        if(newCoords.y > cv.height){this.y = newCoords.y-cv.height};

    }
}
class Boid extends Entity {
    constructor(args){
        super(args)
        this.vector = new Victor.fromObject(args.vector || {x:10,y:0})

        this.geom = [
            new Victor.fromObject({x:12    ,y:0  }),
            new Victor.fromObject({x:-4  ,y:4 }),
            new Victor.fromObject({x:-4 ,y:-4 }),

        ]
    }
    draw(cv){
        cv.strokeStyle = "black"
        cv.fillStyle = "black"
        cv.beginPath();

        for(const vert of this.geom){
            let angle = this.vector.horizontalAngle();
            let rotatedVert = new Victor.fromObject(vert).rotate(angle);

            cv.lineTo(
                this.x+ rotatedVert.x,
                this.y+ rotatedVert.y

                // this.x+ vert.x,
                // this.y+ vert.y
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
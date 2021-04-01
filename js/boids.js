class Boid extends Entity {
    constructor(args){
        super(args)
        this.vector = new Victor.fromObject(args.vector 
            || {x:getRandomInt(7)-4,y:getRandomInt(7)-4})
            // ||{x:0,y:0})

        this.id = args.id;
        this.coherence = args.coherence || 0.01;
        this.separation = args.separation || 0.05;
        this.alignment = args.alignment || 0.1;
        this.visualRadius = args.visualRadius || 200;
        this.maxSpeed = args.maxSpeed || 10;


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

    updatePosition(cv,flock,x,y){
        let neighbours = this.getNeighbours(flock)
        this.separate(neighbours);
        this.align(neighbours);
        this.cohere(neighbours);

        this.limitSpeed();
        
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

    limitSpeed(){
        if(this.vector.length() > this.maxSpeed){
            this.vector.normalize().multiplyScalar(this.maxSpeed);
        }
    }

    separate(flock){
        //set the min distance
        let minDist = this.visualRadius*this.separation;
        let exitVector = Victor(0,0);

        for(const boid of flock){
            let boidVec = Victor(boid.x,boid.y);
            let thisVec = Victor(this.x,this.y);
            if(boidVec.subtract(thisVec).magnitude() <= minDist){
                boidVec = Victor(boid.x,boid.y);
                thisVec = Victor(this.x,this.y);

                exitVector.subtract(boidVec.subtract(thisVec));

            }
        }
        this.vector.add(exitVector)
    }

    align(flock){
        if(flock.length > 0){
            //get average vector
            let averageVec = new Victor(0,0);
            for(const boid of flock){
                averageVec.add(boid.vector);
            }
            averageVec.divideScalar(flock.length);

            //steer to the average vector
            this.vector.multiplyScalar(1-this.alignment)
                .add(averageVec.multiplyScalar(this.alignment));
        }
    }

    cohere(flock){
        if(flock.length>0){
            //get average point
            let averagePoint = new Victor(0,0);
            for(const boid of flock){
                averagePoint.add(new Victor(boid.x,boid.y));
            }

            averagePoint.divideScalar(flock.length);

            //steer towards that point
            let vecToAvg = new Victor(
                averagePoint.x - this.x,
                averagePoint.y - this.y
            );

            this.vector
                .add(vecToAvg.multiplyScalar(this.coherence));
        }
    }

    getNeighbours(flock){
        let neighbours = [];
        for(const boid of flock){
            let distance = new Victor(boid.x-this.x,boid.y-this.y)
            if (distance.length() < this.visualRadius && boid.id != this.id){
                neighbours.push(boid);
            }
        }
        return neighbours;
    }
}
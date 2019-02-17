
let map_dim = {w:100,h:100};
let tilemap_alpha;
let tilemap;
let car_img;

const thisdiv = document.getElementById("Lfig-1");
const thispwidth    = thisdiv.offsetWidth;

var sketch1 = function(p){
    let redcar;
    p.preload = function(){
        tilemap       = p.loadImage("../../../assets/imgs/posts_imgs/classical-ai/body/lfigs/tilemap.png",function(){console.log("yey!")},function(){console.log("no!")})
        tilemap_alpha = p.loadImage("../../../assets/imgs/posts_imgs/classical-ai/body/lfigs/tilemap_collision.png")
        car_img       = p.loadImage("../../../assets/imgs/posts_imgs/classical-ai/body/lfigs/c1.png")
        // p.setup();
    }
    p.setup = function(){
        // console.log("done preloading",tilemap,tilemap_alpha,car_img);
        
        let cvs = p.createCanvas(400,400);
        cvs.parent("#Lfig-1");

        console.log("inside setup")
        redcar = new car(tilemap_alpha);

        p.noLoop();

    }
    p.draw = function(){
        p.background(100);
        p.image(tilemap,0,0,400,400);

        // console.log("inside draw")
        if (redcar.reach_dest){
            menu(p);
        }

        else{

            if (p.keyIsDown(65)) {
                redcar.actions("left")
            }

            if (p.keyIsDown(68)) {
                redcar.actions("right")
            }

            if (p.keyIsDown(87)) {
                redcar.actions("up")
            }

            if (p.keyIsDown(83)) {
                redcar.actions("down")
            }


        }


        redcar.display(p,car_img);

        // p.draw();
    }

    p.windowResized = function(){
        p.resizeCanvas(400,400);
    }

    p.mouseClicked = function(){
        redcar.pos        = {x:70,y:70};
        redcar.reach_dest = false;
    }
}

function menu(p){

    p.fill(80,120)
    p.rect(0,0,p.width,p.height) 

    p.fill(250,255);
    p.textSize(20);
    p.text("\t\tBravo!\n You Reached Your Destination",Math.floor(p.width*.1),p.height/2);

    
}

function car(map){

    this.pos        = {x:70,y:70};
    this.rotation   = 0;
    this.stepsize   = 1;
    this.map        = map;
    this.reach_dest = 0;
    // this.velocity    = 0;
    // this.accleration = 0;

    
    this.checkcollision = function(npos){
        let tpos = {x: Math.floor(((npos.x)**1)/(4)),y:Math.floor(((npos.y)**1)/(4))}; // in which tile he is at
        let mapindex = (tpos.x*map_dim.w + tpos.y);

        let tmapval =   Math.abs( this.map.get(tpos.x,tpos.y)[1]);
        // console.log(tpos,tmapval);

        if (tmapval){
            if( tmapval < 255)
                return 2;

            return 1;
        }
        
        return 0;
    }

    
    this.actions = function(dir){

        let newpos = {x: this.pos.x,y:this.pos.y};
        switch(dir){
            case("right"):
                newpos.x += this.stepsize;
                this.rotation = Math.PI/2;
            break;

            case("left"):
                newpos.x -= this.stepsize;
                this.rotation = -Math.PI/2
            break;

            case("up"):
                newpos.y -= this.stepsize;
                this.rotation =  0;
            break;

           case("down"):
                newpos.y += this.stepsize;
                this.rotation = Math.PI
            break;

            default:

            break;
        }

        let is_collided = this.checkcollision(newpos); // 0 = collided 1 = not collided 2 = destination

        if (is_collided){
            this.pos = newpos;

            
            if (is_collided == 2)
                this.reach_dest = 1;
                

        }
    }
    this.display = function(p,img){
        // console.log("inside car.display")
        p.push();
        p.translate(this.pos.x,this.pos.y);
        p.rotate(this.rotation);

        p.fill(100,200,100);
        // for image
        p.image(img,-img.width*.025,-img.height*.025,img.width*.05,img.height*.05);

        p.pop();

    }
}


var c1 = new p5(sketch1);
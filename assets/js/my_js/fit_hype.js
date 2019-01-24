mhp = 0;// my hyperplane


var canvasDiv = document.getElementById("fit_hyperplane_yourself");
var pwidth = canvasDiv.offsetWidth;

function setup(){
    var canvas = createCanvas(pwidth,400);
    canvas.parent('fit_hyperplane_yourself');
    
    mhp = new hplane({x:width/2,y:height/2});
 
    rnd_pts(
        400,
        {x: width*0.4,y:height*0.3},
        {x: width*0.26,y:height*0.35},
        ptsArray
    );
    rnd_pts(
        400,
        {x: width*0.62,y:height*0.76},
        {x: width*0.49,y:height*0.90},
        ptsArray2
    );

    console.log(ptsArray)
}
function createdottedline(p1,p2){

    // for(let i=0;i<10;i++){
            
    // }
}

let origin_selected = 0;
function draw(){
    background(260);

    // team blue
    push();
    for(let i=0;i<ptsArray.length;i++){
        fill(51, 153, 255)
        let cpt = ptsArray[i];
        let m = ( - mhp.rotation);
        let c1 = mhp.pos.y - Math.cos(mhp.rotation)*mhp.margin;
        let c2 = mhp.pos.y + Math.cos(mhp.rotation)*mhp.margin;
        let lpt = (mhp.apos.x-cpt.pos.x)*m;

        cpt.is_sv = 0;
        if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        ptsArray[i].display();
    }
    pop();

    // team red 
    push();
    for(let i=0;i<ptsArray2.length;i++){
        fill(255, 153, 51)
        let cpt = ptsArray2[i];
        let m = ( - mhp.rotation);
        let c1 = mhp.pos.y - Math.cos(mhp.rotation)*mhp.margin;
        let c2 = mhp.pos.y + Math.cos(mhp.rotation)*mhp.margin;
        let lpt = (mhp.apos.x-cpt.pos.x)*m;

        cpt.is_sv = 0;
        if(Math.abs((lpt+(c1)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        if(Math.abs((lpt+(c2)) - cpt.pos.y ) < 10){
            cpt.is_sv = 1;
        }
        ptsArray2[i].display();
    }
    pop();


    mhp.update();
    mhp.display();

    let distx = (mhp.pos.x-mouseX);
    let disty = (mhp.pos.y-mouseY);
    let dist  = Math.sqrt(distx**2 + disty**2);

    if (dist <20)
    {
        // origin_selected = 1;
        mhp.orad = 20;
    }else {mhp.orad = 10;}

}
function mouseClicked(){ 
    if(origin_selected){
        origin_selected = 0;
        mhp.orad = 10;
    }
}

function mousePressed(){
    let distx = (mhp.pos.x-mouseX);
    let disty = (mhp.pos.y-mouseY);
    let dist  = Math.sqrt(distx**2 + disty**2);
    if (dist <20)
    {
        origin_selected = 1;
        mhp.orad = 20;
    }
}

function mouseDragged(){

    if(mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0){

    if (!origin_selected){

        
        mhp.update_rot();
        mhp.update_margin();

    }
    else{
        mhp.pos = {x:mouseX,y:mouseY};

    }
        }


}

function windowResized() {
  resizeCanvas(canvasDiv.offsetWidth,400);
}


function pts(npos){
    this.pos  = npos;
    this.size = 10;
    this.is_sv= 0;// is this point a support vector??
    this.color = color(100,100,100 )

    this.display = function(){
        // stroke(this.color);

        if (this.is_sv){
            noFill();
            stroke(0);
            // stroke(0);
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        }
        else{
            noStroke();
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        }
    }
}

let ptsArray = [];
let ptsArray2 = [];

function rnd_pts(nps,pos1,pos2,ptarr){

    randomGaussian()*width;
// (width*.4,height*.3)
    for(let i=0;i<nps*.7;i++){
        let npos = {x: Math.floor(randomGaussian()*(40)+pos1.x),
                    y: Math.floor(randomGaussian()*40 +pos1.y )}

            ptarr.push(new pts(npos))


    }

    for(let i=0;i<nps*.3;i++){
        let npos = {x: Math.floor(randomGaussian()*(40) + pos2.x),
                    y: Math.floor(randomGaussian()*20   +  pos2.y)}

            ptarr.push(new pts(npos))
    }
}


function bgrid() {
    let th       = [10, 10];
    let gridsize = [width / th[0], height / th[1]];

    stroke(070, 160, 270, 080);

    strokeWeight(1);
    for (let i = 1; i < th[1] && i < th[0]; i++) {
        line(0, i * gridsize[1], width, i * gridsize[1]);

        // if (i < height/gridsize[1])
        line(i * gridsize[0], 0, i * gridsize[0], height);
    }
    stroke(0);
    strokeWeight(1);

    th = [20, 20];
    gridsize = [width / th[0], height / th[1]];

    stroke(070, 160, 270, 50);
    strokeWeight(1);
    for (let i = 1; i < th[1] && i < th[0]; i++) {
        line(0, i * gridsize[1], width, i * gridsize[1]);

        // if (i < height/gridsize[1])
        line(i * gridsize[0], 0, i * gridsize[0], height);
    }
    stroke(0);
    strokeWeight(1);
}
function findsupportvectors(ppos,dbpos,mlen){

    let dx = (ppos.x-(dbpos.x-mlen))
    let dy = (ppos.y - (dbpos.y-mlen))
    let dist = Math.sqrt(dx**2,dy**2);

    let threshold = 30;

    if(dist < threshold)
        return true;

    return false
}
function hplane(poz){
    this.pos = {x: poz.x,y:poz.y};
    this.rotation = 0;
    this.len = width*2;
    this.margin = 30;
    this.apos = {x:0,y:0};
    this.orad = 10;

    this.update_rot = function(){
        
        this.rotation = -Math.atan2(this.pos.x - mouseX,this.pos.y - mouseY)
    }

    this.update_margin = function (nm){
        // this.margin = nm;
        // let distx   = (this.pos.x-mouseX);
        // let disty   = (this.pos.y-mouseY);
        // let dist    = Math.sqrt(distx**2 + disty**2);

        // this.apos.x = 2;

        this.margin = (mouseX - this.pos.x)/Math.sin(this.rotation);
    }
    
    this.update = function(){
        // this.update_rot();

        this.apos.x = this.pos.x + Math.sin(this.rotation)*this.margin;
        this.apos.y = this.pos.y - Math.cos(this.rotation)*this.margin;

    }
    this.display = function(){
        strokeWeight(2);

        let dist = this.margin;
        let tlen = 20;
        push();
        translate(this.pos.x,this.pos.y);
        rotate(this.rotation);



        fill(0);
        stroke(180);
        line(-this.len/2,-dist,this.len/2,-dist);

        strokeWeight(5);
        stroke(20);
        line(-this.len/2,0,this.len/2,0);
        stroke(251, 29, 255);
        fill(251, 29, 255);
        line(0,0,0,-dist);
        
        push(); 
        translate(0,-(dist-tlen/2));
        triangle(-tlen/2,0,tlen/2,0,0,-tlen/2)
        pop();

        strokeWeight(2);
        stroke(180);
        line(-this.len/2,+dist,this.len/2,+dist);

        
        stroke(251, 29, 255);
        fill(251, 29, 255);
        ellipse(0,0,this.orad,this.orad);
        pop();


    }
}

var sketch1 = function(p){
    p.setup = function(){
        var canvas  = p.createCanvas(400,400);
        canvas.parent("#sketch1");// so that we can modify the position
        p.frameRate(MasterFrameRate);
        p.background(100);

        stack.push(NodeArray[0])
    };

    p.draw = function(){
        // Draw it
        // console.log(p.mouseButton);
        if(p.mouseIsPressed){
            console.log("skjdf");
        }

        if (popped == 1){
          p.frameRate(5);
          frameCount++;
        }

        // if (popped == 0)
        DFS(p);

        // const doSomething = async () => {
        //     await sleep(2000)
        //     //do stuff
        // }

        // doSomething()


        if (frameCount > fcthreshold){
            p.frameRate(MasterFrameRate);
            DFS(p);
            frameCount = -1;
        }

        if (ProgramEnded)p.noLoop();
}
    
};


function mouseClicked(){
    console.log("clicked");
}
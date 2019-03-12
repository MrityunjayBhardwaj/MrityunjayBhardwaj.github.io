

var sketch1 = function(p){

    p.preload = function(){
        tile_map = p.loadImage("Tile_map_collision.png");
    }
    p.setup = function(){
        var canvas  = p.createCanvas(400,400);
        canvas.parent("#sketch1");// so that we can modify the position
        p.frameRate(MasterFrameRate);
        p.background(100);

        diag_ctrl = document.getElementById("isdiag");
        dropbtn_elm = document.getElementById('dbtn_name'); 

        allow_diagonals = diag_ctrl.checked;
        main();
        
        sstatus = document.getElementById("search_status");


        lstorage = localStorage.getItem("testJSON");
        customMap  = JSON.parse(lstorage);

        console.log(customMap);

        // for(let i=0;i<GRID_DIM[0];i++){
        //     for(let j=0;j<GRID_DIM[1];j++){
        //         if (tile_map.get(i,j)[0] < 255)
        //             NodeArray[i*GRID_DIM[0] + j].Status = "isWall"
        //     }
        // }

        for(let i=0;i<GRID_DIM[0];i++){
            for(let j=0;j<GRID_DIM[1];j++){
                let cmap_status=customMap.status[i*GRID_DIM[0] + j];
                if (cmap_status === 0)
                    NodeArray[i*GRID_DIM[0] + j].Status = "isWall";
                if (cmap_status === 1)
                    NodeArray[i*GRID_DIM[0] + j].Status = "";
                if (cmap_status === 2){
                    NodeArray[i*GRID_DIM[0] + j].Status = "isStart"
                    start_index = i*GRID_DIM[0] + j;
                }
                if (cmap_status === 3){
                    end_index = i*GRID_DIM[0] + j;
                    NodeArray[i*GRID_DIM[0] + j].Status = "isGoal";

                }
            }
        }

        let gn_index = (end_index)? end_index: Math.floor(Math.random()*(GRID_DIM[0]*GRID_DIM[1]));
        goalnode = NodeArray[gn_index];
        goalnode.Status = "isGoal";

        NodeArray[start_index].Status = "isStart";
        stack.push(NodeArray[start_index])// add the start node
    };

    p.draw = function(){
        // Draw it
        // console.log(p.mouseButton);

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

        // console.log("slider: ",slider/100);


        slider = document.getElementById("myRange");
        output = document.getElementById("value");
        output.innerHTML = slider.value;

        slider.oninput = function (){
            output.innerHTML = slider.value;
        }
        timeDueration   = 110*(1/slider.value);
        MasterFrameRate = 180*(1/slider.value);



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
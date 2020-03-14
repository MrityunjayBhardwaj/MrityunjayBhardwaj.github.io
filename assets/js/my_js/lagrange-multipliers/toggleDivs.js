function toggleDiv1Fn() {
  var x = document.getElementById("toggleDiv1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 


function myFunction(x) {
if (x.matches) { // If media query matches
    // document.body.style.backgroundColor = "yellow";


    // changing layout1 for mobile devices
    layout1.width = 500;
    layout1.height = 500;
    layout1.images = [];
    layout1.font.size = 14;
    layout1.xaxis.title.font.size = 16;
    layout1.yaxis.title.font.size = 16;

    // changing size of the viz4Sketch
    layout_3.width = 400;
    layout_3.height = 400;


    winningOverlayElement2.style.margin = "5% 20%";
    winningOverlayElement1.style.margin = "15% 20%";

    // document.getElementById("viz3Container").style.flexDirection = "column-reverse"

      Plotly.newPlot('viz4Sketch',data_3A,layout_3)

    Plotly.react('viz1Sketch',data1,layout1);

    document.getElementById('viz1Controls').style.height = "250px";
    document.getElementById('viz2Controls').style.height = "250px";

} else {
    document.body.style.backgroundColor = "pink";
}
}

var x = window.matchMedia("(max-width: 1000px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
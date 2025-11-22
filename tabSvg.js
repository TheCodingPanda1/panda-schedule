var edges = document.getElementsByClassName("tabEdge");
function setEdges() {
    for(var i = 0; i < edges.length; i++){
        edges[i].innerHTML = /*html*/`<path d = "M 0 0 a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${pxCssVar("radius")} L ${pxCssVar("radius")} 0 z" fill = "var(--background)"></path>`
    }
}
setEdges();
function infected(days) {
  var infected = 1;
  for(var i = 1; i <= days; i ++){
    infected *= 2;
    if(Math.round(i / 3) == i / 3){
      infected = Math.round(infected *= 4/5);
      console.log("patched")
    }
  }
  console.log(infected);
  return infected
}
infected(1)
infected(3)
infected(8)
infected(17)
infected(25)
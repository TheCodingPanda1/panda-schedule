var root = document.documentElement;
root.style.setProperty("--screen-width", document.scrollWidth + "px");
var main = document.getElementById("main");
main.scrollLeft = 0;
var set0 = setInterval(() => {
    if(main.scrollLeft == 0){
        clearInterval(set0);
    }
    if(main.scrollLeft != 0){
        main.scrollLeft = 0;
    }
}, 100);
function setScreenPos() {
    for(var i = 0; i < screens.length; i ++){
        screens[i].style.left = (i * document.body.scrollWidth) + "px";
    }
}
setScreenPos();
window.addEventListener("resize", function() {
    root.style.setProperty("--screen-width", document.body.scrollWidth + "px");
    setScreenPos();
    changeSliderPos();
});
for(var i = 0; i < tabs.length; i ++){
    tabs[i].getElementsByTagName("svg")[0].style.opacity = 0;
    tabs[0].getElementsByTagName("svg")[0].style.opacity = 1;
}
var root = document.documentElement;
root.style.setProperty("--screen-width", document.body.getBoundingClientRect().width + "px");
root.style.setProperty("--screen-height", document.body.getBoundingClientRect().height + "px");
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
        screens[i].style.left = (i * document.body.getBoundingClientRect().width) + "px";
    }
}
setScreenPos();
window.addEventListener("resize", function() {
    root.style.setProperty("--screen-width", document.body.getBoundingClientRect().width + "px");
    setScreenPos();
    changeSliderPos();
});
for(var i = 0; i < tabs.length; i ++){
    tabs[i].getElementsByTagName("svg")[0].style.opacity = 0;
    tabs[0].getElementsByTagName("svg")[0].style.opacity = 1;
}
var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
function changeMode() {
    root.style.setProperty("--transition", "0s");
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(isDarkMode){
        root.classList.add("dark-mode");
    } else {
        root.classList.remove("dark-mode");
    }
    setTimeout(function() {
        root.style.setProperty("--transition", "0.25s");
    }, 0);
}
changeMode();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    changeMode();
});
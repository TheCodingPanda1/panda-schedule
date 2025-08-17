
//Root for css variable changing
var root = document.documentElement;
var mouseX = 0;
var mouseY = 0;

var customTheme = false;
if(!localStorage.getItem("theme")){
    localStorage.setItem("theme", "device");
}

var screens = document.getElementsByClassName("screen");
var tabs = document.getElementsByClassName("tab");
var tabHolder = document.getElementById("tab-holder");
root.style.setProperty("--screen-width", document.body.getBoundingClientRect().width + "px");
root.style.setProperty("--screen-height", document.body.getBoundingClientRect().height + "px");
var main = document.getElementById("main");
var scale = 0.75;
var selectedGradients = document.getElementsByClassName("selected-gradient");
var firstThemeChange = true;
main.scrollLeft = 0;
function pxify(num){
    return num * 16;
}
function pxCssVar (variable){
    let element = document.createElement("div");
    element.style.width = `var(--${variable})`;
    document.body.appendChild(element);
    //Clean up
    var result = element.getBoundingClientRect().width;
    document.body.removeChild(element);
    return result;
}
function setSvgSize(){
    tabWidth = tabs[0].getBoundingClientRect().width / scale;
    for(var i = 0; i < selectedGradients.length; i ++){
        selectedGradients[i].style.width = pxCssVar("radius") * 2 + pxify(tabWidth) + "px";
        selectedGradients[i].innerHTML = `<path d = "M${pxCssVar("radius")} ${pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} l ${tabWidth - pxCssVar("radius") * 2} 0 a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${pxCssVar("radius")} L ${tabWidth + pxCssVar("radius")} ${pxify(3.125) / scale - pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${pxCssVar("radius")} L 0 ${pxify(3.125) / scale} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} z" stroke = "none" fill="var(--active-tabs)"/>`;
    }
}
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
var isDarkMode;
if(localStorage.getItem("theme")){
    if(localStorage.getItem("theme") == "device"){
        customTheme = false;
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
        isDarkMode = JSON.parse(localStorage.getItem("theme"))[0];
    }
} else {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark').matches;
}
if(localStorage.getItem("customTheme") == "true"){
    customTheme = true;
}
function changeMode() {
    if(firstThemeChange){
        root.style.setProperty("--transition", "0s");
        setTimeout(function(){
            firstThemeChange = false;
        }, 1)   
    }
    document.body.setAttribute("class", "themeChanging");
    if(customTheme == false) {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    if(isDarkMode){
        root.classList.add("dark-mode");
    } else {
        root.classList.remove("dark-mode");
    }
    setTimeout(function() {
        root.style.setProperty("--transition", "0.25s");
        document.body.setAttribute("class", "");
    }, 1);
}
changeMode();
var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', function(){
    changeMode();
});
window.addEventListener("mousemove", function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
});
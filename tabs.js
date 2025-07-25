//The variables
var tabHolder = document.getElementById("tab-bar").getElementsByTagName("div")[0];
var tabInputs = [];
var slider = document.getElementById("slider");
var scale = 0.75;
var maxTabWidth = pxCssVar("maximum-tab-width");
var tabWidth = tabs[0].getBoundingClientRect().width;
var main = document.getElementById("main");
var neededTransition = "0s";

root.style.setProperty("--tab-width", tabWidth / scale + "px");

var selectedGradients = document.getElementsByClassName("selected-gradient");
var minusAmount = 0;
if(tabWidth > maxTabWidth){
    tabWidth = maxTabWidth;
}
for(var i = 0; i < tabs.length; i ++){
    tabInputs[i] = tabs[i].getElementsByTagName("input")[0];
}

// The functions
function checkTabNum(){
    for(var i = 0; i < tabs.length; i ++){
        if(tabInputs[i].checked){
            return i;
        }
    }
}
function getContentWidth(element){
    return element;
}
function remify(num){
    return num / 16;
}
function pxify(num){
    return num * 16;
}
function findWhichElement(element, array){
    for(var i = 0; i < array.length; i ++){
        if(array[i] === element){
            return i;
        }
    }
    return -1;
}
var lastScrollLeft = 0;
function changeSliderPos(){
    slider.style.transition = neededTransition;
    let from = tabs[0].offsetLeft;
    let to = tabs[tabs.length - 1].offsetLeft;
    let minusAmount = 0;
    var scrollAmount = main.scrollLeft / document.body.getBoundingClientRect().width - Math.floor(main.scrollLeft / document.body.getBoundingClientRect().width);
    let fromElement = tabs[Math.floor(main.scrollLeft / (document.body.getBoundingClientRect().width))];
    if(Math.floor(main.scrollLeft / (document.body.getBoundingClientRect().width)) > tabs.length - 1){
        fromElement = tabs[tabs.length - 1];
    }
    if(Math.floor(main.scrollLeft / document.body.getBoundingClientRect().width) < 0){
        fromElement = tabs[0];
        scrollAmount = 0;
    }
    let toElement = tabs[Math.ceil(main.scrollLeft / (document.body.getBoundingClientRect().width))];
    if(Math.ceil(main.scrollLeft / (document.body.getBoundingClientRect().width)) > tabs.length - 1){
        toElement = tabs[tabs.length - 1]; 
    }
    if(Math.ceil(main.scrollLeft / (document.body.getBoundingClientRect().width)) < 0){
        toElement = tabs[0];
        scrollAmount = 0;
    }
    for(var i = 0; i < tabs.length; i ++){
        tabs[i].getElementsByTagName("svg")[0].style.opacity = 0;
    }
    toElement.getElementsByTagName("svg")[0].style.opacity = scrollAmount;
    fromElement.getElementsByTagName("svg")[0].style.opacity = 1 - scrollAmount;
    const svg = fromElement.getElementsByTagName("svg")[0];
    svg.style.transform = "translateZ(0)";
    slider.style.left = scrollAmount * (toElement.offsetLeft - fromElement.offsetLeft) + fromElement.offsetLeft + "px";
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
changeSliderPos();
main.addEventListener("scroll", changeSliderPos);
function setSvgSize(){
    tabWidth = tabs[0].getBoundingClientRect().width / scale;
    for(var i = 0; i < selectedGradients.length; i ++){
        selectedGradients[i].style.width = pxCssVar("radius") * 2 + pxify(tabWidth) + "px";
        selectedGradients[i].innerHTML = `<path d = "M${pxCssVar("radius")} ${pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} l ${tabWidth - pxCssVar("radius") * 2} 0 a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${pxCssVar("radius")} L ${tabWidth + pxCssVar("radius")} ${pxify(3.125) / scale - pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${pxCssVar("radius")} L 0 ${pxify(3.125) / scale} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} z" stroke = "none" fill="var(--active-tabs)"/>`;
    }
}
setSvgSize();
function setClicks(){
    for(var i = 0; i < tabs.length; i ++){
        tabs[i].addEventListener("click", function(){
            var screen = screens[findWhichElement(this, tabs)];
            var screenLeft = screen.offsetLeft;
            main.scrollTo({
                left: screenLeft
            });
            neededTransition = "var(--transition)";
            setTimeout(function() {
                neededTransition = "0s";
            }, root.style.getPropertyValue("--transition").replace("s", "") * 1000);
        });
    }
}
setClicks();
window.addEventListener("resize", function() {
    root.style.setProperty("--screen-width", document.body.getBoundingClientRect().width + "px");
    root.style.setProperty("--screen-height", document.body.getBoundingClientRect().height + "px");
    setScreenPos();
    changeSliderPos();
    setSvgSize();
});
window.addEventListener("resize", function(){
    root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px");

});
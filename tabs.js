//The variables
var tabHolder = document.getElementById("tab-bar").getElementsByTagName("div")[0];
var tabInputs = [];
var slider = document.getElementById("slider");
var scale = 0.75;
var maxTabWidth = remify(document.body.scrollWidth / 3 / scale);
var tabWidth = remify(document.body.scrollWidth / 3 / scale);
var main = document.getElementById("main");

var selectedGradients = document.getElementsByClassName("selected-gradient");
var minusAmount = 0;
tabWidth = Math.min(tabWidth, maxTabWidth);
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
    let from = tabs[0].offsetLeft;
    let to = tabs[tabs.length - 1].offsetLeft;
    let minusAmount = 0;
    var scrollAmount = main.scrollLeft / document.body.scrollWidth - Math.floor(main.scrollLeft / document.body.scrollWidth);
    let fromElement = tabs[Math.floor(main.scrollLeft / (document.body.scrollWidth))];
    if(Math.floor(main.scrollLeft / (document.body.scrollWidth)) > tabs.length - 1){
        fromElement = tabs[tabs.length - 1];
    }
    if(Math.floor(main.scrollLeft / document.body.scrollWidth) < 0){
        fromElement = tabs[0];
        scrollAmount = 0;
    }
    let toElement = tabs[Math.ceil(main.scrollLeft / (document.body.scrollWidth))];
    if(Math.ceil(main.scrollLeft / (document.body.scrollWidth)) > tabs.length - 1){
        toElement = tabs[tabs.length - 1]; 
    }
    if(Math.ceil(main.scrollLeft / (document.body.scrollWidth)) < 0){
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
for(var i = 0; i < selectedGradients.length; i ++){
    selectedGradients[i].style.width = pxCssVar("radius") * 2 + pxify(tabWidth) + "px";
    selectedGradients[i].innerHTML = `<path d = "M${pxCssVar("radius")} ${pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} L ${pxify(tabWidth)} 0 a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${pxCssVar("radius")} L ${pxify(tabWidth) + pxCssVar("radius")} ${50 / scale - pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${pxCssVar("radius")} L 0 ${pxify(3.125) / scale} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} z" stroke = "none" fill="var(--active-tabs)"/>`;
}
for(var i = 0; i < tabs.length; i ++){
    tabs[i].addEventListener("click", function(){
        var screen = screens[parseInt(this.getAttribute("goto"))];
        var screenLeft = screen.offsetLeft;
        main.scrollTo({
            left: screenLeft
        });
    });
}
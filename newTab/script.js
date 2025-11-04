var main = window.parent.document.getElementById("main");
var screens = main.getElementsByClassName("screen");
var tabHolder = window.parent.document.getElementById("tab-holder");
var tabs = tabHolder.getElementsByClassName("tab");
function changeTab(tabInnerHTML, screenSource, iframeId = NaN){
    console.log("yay2");
    var selectedTab = tabs[main.scrollLeft / sd.width];
    if(iframeId){
        for(var i = 0; i < screens.length; i ++){
            if(screens[i].getAttribute("id") == iframeId){
                console.log("yay1");
                deleteTab(selectedTab);
            }
        }
    } else {
        selectedTab.innerHTML = tabInnerHTML;
    }

}
function newTab(tabInnerHTML, screenSource, iframeId = NaN){
    console.log("NewTab");
    for(var i = 0; i < tabs.length; i ++) {
        tabs[i].getElementsByTagName("div")[0].style.opacity = 0;
        if(!tabs[i].getElementsByClassName("closetab")[0]){
            var closediv = document.createElement("div");
            closediv.setAttribute("class", "closetab");
            tabs[i].appendChild(closediv);
        }
    }
    var tab = document.createElement("div");
    tab.setAttribute("class", "tab");
    tab.innerHTML = tabInnerHTML;
    tabHolder.appendChild(tab);
    tab.setAttribute("tabindex", "1");
    var iframe = document.createElement("iframe");
    iframe.src = screenSource;
    iframe.setAttribute("class", "screen");
    if(iframeId){
        iframe.setAttribute("id", iframeId);
    }
    main.appendChild(iframe);
    setScreenPos();
    main.scrollTo(main.getElementsByClassName("screen")[main.getElementsByClassName("screen").length - 1].offsetLeft, 0);
    setClicks();
}
function deleteTab(tab){
    
    
    closingTab = true;
    tab.parentElement.style.animation = "closeTab var(--transition)";
    var currentElement = tab.parentElement;
    var tab1 = tabHolder.getElementsByClassName("tab")[0];
    tabHolder.removeChild(tab1);
    var previewTabWidth = tabHolder.getElementsByClassName("tab")[0].getBoundingClientRect().width / scale;
    root.style.setProperty("--tab-width", previewTabWidth + "px");
    setTimeout(() => {
        tabHolder.insertBefore(tab1, tabHolder.firstChild);
    }, 0);
    setTimeout(function(){
        
        if(screens[findWhichElement(currentElement, tabs)]){
            main.removeChild(screens[findWhichElement(currentElement, tabs)]);
        }
        screens = document.getElementsByClassName("screen");
        setScreenPos();
        if([].slice.call(tabHolder.children).includes(currentElement)){
            tabHolder.removeChild(currentElement);
        }
        tabs = document.getElementsByClassName("tab");
        if(tabs.length == 1 && tabs[0].getElementsByClassName("closetab")[0]){
            tabs[0].removeChild(tabs[0].getElementsByClassName("closetab")[0]);
            tabs[0].hasEventListener = false;
        }
        closingTab = false;
    }, parseFloat(transition.replace("s", "")) * 1000);
                
    setClicks();
    setScreenPos();
    changeSliderPos();
    root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px");
}
if(window.self == window.top){
    var newTabButton = document.getElementById("new-tab");
    newTabButton.addEventListener("click", function(){
        console.log("yay");
        neededTransition = "0.25s";
        newTab("<p>New Tab</p> <div class = 'selected-gradient'></div> <div class = 'closetab'></div>", "./newtab/index.html");
        root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px");
    });
}

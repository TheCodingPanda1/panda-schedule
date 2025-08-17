function newTab(tabInnerHTML, screenOuterHTML){
    for(var i = 0; i < tabs.length; i ++) {
        tabs[i].getElementsByTagName("svg")[0].style.opacity = 0;
    }
    var tab = document.createElement("div");
    tab.setAttribute("class", "tab");
    tab.innerHTML = tabInnerHTML;
    tabHolder.appendChild(tab);
    setSvgSize();
    setInterval(function() {
        setSvgSize();
    }, 1);
    main.innerHTML += screenOuterHTML;
    setScreenPos();
}
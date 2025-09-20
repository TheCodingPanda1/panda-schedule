function newTab(tabInnerHTML, screenOuterHTML){
    for(var i = 0; i < tabs.length; i ++) {
        tabs[i].getElementsByTagName("div")[0].style.opacity = 0;
    }
    var tab = document.createElement("div");
    tab.setAttribute("class", "tab");
    tab.innerHTML = tabInnerHTML;
    tabHolder.appendChild(tab);
    main.innerHTML += screenOuterHTML;
    setScreenPos();
    main.scrollTo(main.getElementsByClassName("screen")[main.getElementsByClassName("screen").length - 1].offsetLeft, 0);
}
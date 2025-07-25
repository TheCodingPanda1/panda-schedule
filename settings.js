var settingsButton = document.getElementById("settings-button");
var settingsOpen = false;
var settingsPos = 0;
settingsButton.addEventListener("click", function() {
    for(var i = 0; i < screens.length; i ++) {
        if(screens[i].getAttribute("id") == "settings-screen") {
            settingsOpen = true;
            settingsPos = i;
        }
    }
    if(settingsOpen){
        main.scrollTo(settingsPos * document.body.getBoundingClientRect().width, 0);
    }
    else{
        for(var i = 0; i < tabs.length; i ++) {
            tabs[i].getElementsByTagName("svg")[0].style.opacity = 0;
        }
        tabHolder.innerHTML += `<div class="tab" style="animation: tabExpand var(--transition);"><p>Settings</p><svg class = "selected-gradient"><path d = "M${pxCssVar("radius")} ${pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} l ${tabWidth - pxCssVar("radius") * 2} 0 a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${pxCssVar("radius")} L ${tabWidth + pxCssVar("radius")} ${pxify(3.125) / scale - pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${pxCssVar("radius")} L 0 ${pxify(3.125) / scale} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} z" stroke = "none" fill="var(--active-tabs)"/></svg></div>`
        setSvgSize();
        setInterval(function() {
            setSvgSize();
        }, 1);
        main.innerHTML += /*html*/`
        <div id = "settings-screen" class = "screen">
            <div class = "scroller">
                <div id = "folder-holder">
                    <div class = "settings-folder">
                        <p>Appearance</p>
                        <div class = "folder-holder">
                            <div class = "theme-option">
                                <p>Light Theme</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "fixer"></div>
            </div>
            <div id = "settings-top-bar" class = "control-top-bar">
                <p>Settings</p>
            </div>
        </div>
        `;
        setScreenPos();
        main.scrollTo(main.scrollWidth - document.body.getBoundingClientRect().width, 0);
    } 
    setClicks();
    //The actual functionality of the settings screen
    var folders = document.getElementsByClassName("settings-folder");
    for(var i = 0; i < folders.length; i ++) {
        folders[i].addEventListener("click", function() {
            this.getElementsByClassName("folder-holder")[0].style.display = "block";
        });
    }           
});


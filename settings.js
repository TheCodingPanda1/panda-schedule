var settingsButton = document.getElementById("settings-button");
var settingsOpen = false;
var settingsPos = 0;
var themeChangeSelect = document.getElementById("themeChangeSelect");
settingsButton.addEventListener("click", function() {
    for(var i = 0; i < screens.length; i ++) {
        if(screens[i].getAttribute("id") == "settings-screen") {
            settingsOpen = true;
            settingsPos = i;
        }
    }
    neededTransition = "var(--transition)";
    if(settingsOpen){
        main.scrollTo(settingsPos * document.body.getBoundingClientRect().width, 0);
    }
    else{
        for(var i = 0; i < tabs.length; i ++) {
            tabs[i].getElementsByTagName("svg")[0].style.opacity = 0;
        }
        var tab = document.createElement("div");
        tab.setAttribute("class", "tab");
        tab.innerHTML = /*html*/`
            <p>Settings</p>
            <svg class = "selected-gradient">
                <path d = "M${pxCssVar("radius")} ${pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} l ${tabWidth - pxCssVar("radius") * 2} 0 a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 1 ${pxCssVar("radius")} ${pxCssVar("radius")} L ${tabWidth + pxCssVar("radius")} ${pxify(3.125) / scale - pxCssVar("radius")} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${pxCssVar("radius")} L 0 ${pxify(3.125) / scale} a ${pxCssVar("radius")} ${pxCssVar("radius")} 0 0 0 ${pxCssVar("radius")} ${0 - pxCssVar("radius")} z" stroke = "none" fill="var(--active-tabs)"/>
            </svg>
        `;
        tabHolder.appendChild(tab);
        setSvgSize();
        main.innerHTML += /*html*/`
<div id = "settings-screen" class = "screen">
<div class = "scroller" id = "settings-scroller">
<div class = "scroll-point" style = "left: 0px;"></div>
<div id = "folder-holder">
<div class = "settings-folder">
<p>Appearance</p>
<div class = "folder-holder">
<div class = "theme-option">
<div id = "themeChangeHolder">
Theme:
<div class = "input" tabindex = "1" id = "themeChangeSelect" value = "Device" normalorder='["deviceThemeOption", "lightThemeOption", "darkThemeOption"]'>
<div tabindex="1" id = "deviceThemeOption">
Device
<div class = "colour-widget" id = "device"></div>
</div>
<div tabindex="1" id = "lightThemeOption">
Light
<div class = "colour-widget" id = "light"></div>
</div>
<div tabindex="1" id = "darkThemeOption">
Dark
<div class = "colour-widget" id = "dark"></div>
</div>
</div>
</div>

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
        var settingsScroller = document.getElementById("settings-scroller");
        setScreenPos();
        main.scrollTo(main.scrollWidth - document.body.getBoundingClientRect().width, 0);
        themeChangeSelect = document.getElementById("themeChangeSelect");  
        setThemeChange();
        setUpInputs();
        var theme = localStorage.getItem("theme");
        var searchingFor;
        if(theme == "device"){
            searchingFor = "device";
        } else if(theme == "[false]"){
            searchingFor = "Light";
        } else {
            searchingFor = "Dark";
        }
        console.log(theme, "Device")
        for(let i = 0; i < themeChangeSelect.children.length; i ++){
            if(themeChangeSelect.children[i].innerText.replaceAll("\n", "").replaceAll("\r", "").replaceAll(" ", "") == searchingFor){
                setFirst(themeChangeSelect.children[i], true);
            }
        }
    } 
    setClicks();
    //The actual functionality of the settings screen
    var folders = document.getElementsByClassName("settings-folder");
    function setUpSettingsFolders(){
        for(var i = 0; i < folders.length; i ++) {
            folders[i].number = i;
            folders[i].addEventListener("click", function() {
                this.getElementsByClassName("folder-holder")[0].style.display = "block";
                requestAnimationFrame(() => {
                    this.getElementsByClassName("folder-holder")[0].scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "start"
                    });
                });
                var div = document.createElement("div");
                div.setAttribute("class", "scroll-point");
                div.style.left = (this.number + 1) * 100 + "%";
                document.getElementById("settings-scroller").appendChild(div);
            });
        }
    }
    setUpSettingsFolders();
    root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px");  
    window.addEventListener("resize", setUpSettingsFolders);       
});
function setThemeChange(){
    themeChangeSelect.addEventListener("click", function(){
        var value = themeChangeSelect.value.replace("\n", "").replace("\r", "");
        console.log(value);
        if(value == "Device"){
            isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            localStorage.setItem("theme", "device");
            localStorage.setItem("customTheme", "false");
            customTheme = false;
            console.log("Device");
        } else if(value == "Light") {
            isDarkMode = false;
            customTheme = true;
            localStorage.setItem("theme", "[false]");
            localStorage.setItem("customTheme", "true");
            console.log("Light");
        } else {
            isDarkMode = true;
            customTheme = true;
            localStorage.setItem("theme", "[true]");
            localStorage.setItem("customTheme", "true");
            console.log("dark");
        }
        changeMode();

    });
};
let lastRatio = window.devicePixelRatio;

setInterval(() => {
  if (window.devicePixelRatio !== lastRatio) {
    lastRatio = window.devicePixelRatio;
    // Trigger your SVG resize logic here
    setSvgSize();
  }
}, 200);

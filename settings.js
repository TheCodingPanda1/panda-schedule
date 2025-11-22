var settingsButton = document.getElementById("settings-button");
var settingsOpen = false;
var settingsPos = 0;
var themeChangeSelect;
function init_settings(){
            
            setScreenPos();
            setThemeChange();
            var theme = localStorage.getItem("theme");
            var searchingFor;
            if(theme == "device"){
                searchingFor = "device";
            } else if(theme == "[false]"){
                searchingFor = "Light";
            } else {
                searchingFor = "Dark";
            }
            for(let i = 0; i < themeChangeSelect.children.length; i ++){
                if(themeChangeSelect.children[i].innerText.replaceAll("\n", "").replaceAll("\r", "").replaceAll(" ", "") == searchingFor){
                    setFirst(themeChangeSelect.children[i], true);
                }
            }
        }
settingsButton.addEventListener("click", function() {
    
    for(var i = 0; i < screens.length; i ++) {
        if(screens[i].getAttribute("id") == "settings-screen") {
            settingsOpen = true;
            settingsPos = i;
        }
    }
    neededTransition = "var(--transition)";
    if(settingsOpen){
        main.scrollTo(settingsPos * sd.width, 0);
    }
    else{
        newTab("<p>Settings</p> <div class = 'selected-gradient'></div> <div class = 'closetab'></div> <svg class = 'tabEdge'> </svg><svg class = 'tabEdge'></svg>", "./settings/index.html");
        main.scrollTo(main.scrollWidth, 0);
    } 
    setClicks();
    //The actual functionality of the settings screen
    root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px");
});
function setThemeChange(){
    
    themeChangeSelect.addEventListener("mousedown", function(e){
        
        e.stopPropagation();
        var value = themeChangeSelect.value.replace("\n", "").replace("\r", "");
        if(value == "Device"){
            isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            localStorage.setItem("theme", "device");
            localStorage.setItem("customTheme", "false");
            customTheme = false;
        } else if(value == "Light") {
            isDarkMode = false;
            customTheme = true;
            localStorage.setItem("theme", "[false]");
            localStorage.setItem("customTheme", "true");
        } else {
            isDarkMode = true;
            customTheme = true;
            localStorage.setItem("theme", "[true]");
            localStorage.setItem("customTheme", "true");
        }
        changeMode();

    });
};
let lastRatio = window.devicePixelRatio;

setInterval(() => {
  if (window.devicePixelRatio !== lastRatio) {
    lastRatio = window.devicePixelRatio;
    // Trigger your SVG resize logic here
  }
}, 200);

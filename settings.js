var settingsButton = document.getElementById("settings-button");
var settingsOpen = false;
var settingsPos = 0;
var themeChangeSelect;
function init_settings(){
            setScreenPos();
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
        main.scrollTo(settingsPos * document.body.getBoundingClientRect().width, 0);
    }
    else{
        newTab("<p>Settings</p> <div class = 'selected-gradient'></div>", "<iframe class = 'screen' id = 'settings-screen' src='./settings/index.html'></iframe>");
        main.scrollTo(main.scrollWidth, 0);
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

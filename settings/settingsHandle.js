var settingsFolders = document.getElementsByClassName("settings-folder");
for(var i = 0; i < settingsFolders.length; i ++){
    settingsFolders[i].gotScrollPoint = "false";
    settingsFolders[i].addEventListener("click", function(e) {
        var el = this.getElementsByClassName("folder-holder")[0];
        el.style.display = "block";
        this.classList.add("hasVisible");
        var div = document.createElement("div");
        div.setAttribute("class", "scroll-point");
        div.style.left = document.body.getBoundingClientRect().width * parseInt(el.getAttribute("number")) + "px";
        if(this.gotScrollPoint == "false"){
            document.getElementById("settings-scroller").appendChild(div);
            this.gotScrollPoint = "true";
        }
        setTimeout(function(){
            el.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });
        }, 1);
    });
};
function setThemeChange(){
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
};
themeChangeSelect.addEventListener("click", setThemeChange);
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
function sendToSettingsPart(){
    document.getElementsByClassName("scroller")[0].scrollTo(parseInt(this.getAttribute("whereToScroll")), 0);
}
document.getElementById("settingsLink").addEventListener("click", sendToSettingsPart);
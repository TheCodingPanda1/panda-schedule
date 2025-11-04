
//Root for css variable changing
var root = document.documentElement;
var mouseX = 0;
var mouseY = 0;
var customTheme = false;
var movedAmount = 0;
var direction = 0;
var trimAmount = 0;
var transition = "0.25s";
var focused = false;
var sd = root.getBoundingClientRect();
var searchItems = [
    ["Settings", function(){
        
        if(!document.getElementById("settings-screen")){
            newTab("<p>Settings</p> <div class = 'focused-gradient'></div> <div class = 'closetab'></div>", "./settings/index.html", "settings-screen"); 
            setClicks(); 
            root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px");
            neededTransition = "0.25s";
        } else {
            document.getElementById("settings-screen").scrollIntoView();
            neededTransition = "0.25s";
        }
    }],
    ["Show Sidebar", function(){
        console.log('yay')
        
    }],
    ["Create Task", function(){
        
        
    }],
    ["New Tab", function(){
        
    }]
];
var pinned = [
    ["Settings", function(){
        if(!document.getElementById("settings-screen")){
            newTab("<p>Settings</p> <div class = 'focused-gradient'></div> <div class = 'closetab'></div>", "./settings/index.html", "settings-screen");
            setClicks(); 
            root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px");
            neededTransition = "0.25s";
            
        } else {
            document.getElementById("settings-screen").scrollIntoView();
            neededTransition = "0.25s";
        }
    }],
    ["Show Sidebar",function(){
        
        
    }],
    ["Create Task", function(){
        
    }],
    ["New Tab", function(){
        
    }]
]
root.style.setProperty("--screen-width", sd.width + "px");
root.style.setProperty("--screen-height", sd.height + "px");
window.addEventListener("resize", function(){
    
    sd = root.getBoundingClientRect();
    root.style.setProperty("--screen-width", sd.width + "px");
    root.style.setProperty("--screen-height", sd.height + "px");
});

var scale = 0.75;
if(!localStorage.getItem("theme")){
    localStorage.setItem("theme", "device");
}

var screens = document.getElementsByClassName("screen");
var tabs = document.getElementsByClassName("tab");
var tabHolder = document.getElementById("tab-holder");
var main = document.getElementById("main");
var focusedGradients = document.getElementsByClassName("focused-gradient");
var firstThemeChange = true;
var invertSelect = document.getElementById("invertCheckbox");
if(localStorage.getItem("inverted") == "true"){
    if(invertSelect){
        invertSelect.checked = true;
    } else {
        document.body.style.filter = "invert(100%)";
    }
    
}
if(main){
    main.scrollLeft = 0;
}
function pxify(num){
    
    let testEl = document.createElement("div");
    testEl.style.width = "1rem";
    testEl.style.height = "1px";
    document.body.appendChild(testEl);
    let remSize = testEl.getBoundingClientRect().width;
    return num * remSize;
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
document.addEventListener("DOMContentLoaded", function(){
    if(window.self == window.top){
        main.scrollLeft = 0;
    }
});
function setScreenPos() {
    
    for(var i = 0; i < screens.length; i ++){
        screens[i].style.left = (i * sd.width) + "px";
    }
}
setScreenPos();
for(var i = 0; i < tabs.length; i ++){
    tabs[i].getElementsByTagName("div")[0].style.opacity = 0;
}
var isDarkMode;
if(localStorage.getItem("theme")){
    if(localStorage.getItem("theme") == "device"){
        customTheme = false;
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
        isDarkMode = JSON.parse(localStorage.getItem("theme"))[0];
    }
} else {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark').matches;
}
if(localStorage.getItem("customTheme") == "true"){
    customTheme = true;
}
function changeMode() {
    
    if(window.parent){
        window.parent.document.documentElement.style.setProperty("--transition", "0s");
    }
    if(firstThemeChange){
        root.style.setProperty("--transition", "0s");
        setTimeout(function(){
            
            firstThemeChange = false;
        }, 1);
    }
    document.body.setAttribute("class", "themeChanging");
    if(customTheme == false) {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    if(isDarkMode){
        root.classList.add("document-dark-mode");
        if(window.parent){
            window.parent.document.documentElement.classList.add("document-dark-mode");
        }
    } else {
        root.classList.remove("document-dark-mode");
        if(window.parent){
            window.parent.document.documentElement.classList.remove("document-dark-mode");
        }
    }
    setTimeout(function() {
        
        root.style.setProperty("--transition", transition);
        document.body.setAttribute("class", "");
        if(window.parent){
            window.parent.document.documentElement.style.setProperty("--transition", transition);

        }
    }, 1);
}
changeMode();
var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', function(){
    
    changeMode();
});
window.addEventListener("mousemove", function(e){
    
    mouseX = e.clientX;
    mouseY = e.clientY;
});
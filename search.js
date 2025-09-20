//Search bar suggestions
var input = document.getElementById("search-input");
var items = document.getElementById("search-results");
const searchItems = [
    ["Settings", function(){newTab("<p>Settings</p> <div class = 'selected-gradient'></div>", "<iframe class = 'screen' id = 'settings-screen' src='./settings/index.html'></iframe>"); root.style.setProperty("--tab-width", tabs[0].getBoundingClientRect().width / scale + "px"); neededTransition = "0.25s"; setClicks();}],
    ["Show Sidebar", function(){
        
    }],
    ["Create Task", function(){
        
    }],
    ["New Tab", function(){
        
    }]
];
const pinned = [
    ["Settings", function(){newTab("<p>Settings</p> <div class = 'selected-gradient'></div>", "<iframe class = 'screen' id = 'settings-screen' src='./settings/index.html'></iframe>")}],
    ["Show Sidebar",function(){
        
    }],
    ["Create Task", function(){
        
    }],
    ["New Tab", function(){
        
    }]
]
const reloadSuggestions = function(){
    items.innerHTML = "";
    var values = [];
    for(var k = 0; k < searchItems.length; k ++){
        values[k] = 0;
        for(var i = 0; i < input.value.length; i ++){
            for(var j = input.value.length - i; j > 0; j --){
                let substring = input.value.substr(i, i + j).toLowerCase();
                if(searchItems[k][0].toLowerCase().includes(substring)){
                    values[k] += substring.length;
                }
                if(searchItems[k][0].toLowerCase().startsWith(substring) && input.value.toLowerCase().includes(" " + substring) || searchItems[k][0].toLowerCase().startsWith(substring) && input.value.startsWith(substring)){
                    values[k] ++;
                } else if(searchItems[k][0].toLowerCase().includes(" " + substring) && input.value.toLowerCase().includes(" " + substring) || searchItems[k][0].toLowerCase().includes(" " + substring) && input.value.startsWith(substring)){
                    values[k] ++;
                }
            }
        }        
    }
    let highest = 0;
    let numberOfHighest = 0;
    for(var k = 0; k < values.length; k ++){
        if(values[k] > highest){
            highest = values[k];
        }
    }
    for(var k = 0; k < values.length; k ++){
        if(values[k] == highest){
            let div = document.createElement("div");
            div.innerHTML = searchItems[k][0];
            div.arraySpot = k;
            items.appendChild(div);
            div.addEventListener("mousedown", function(){
                searchItems[this.arraySpot][1]();
            });
            numberOfHighest ++;
        }
    }
    root.style.setProperty("--search-bar-height", (numberOfHighest + 1) * 50 + "px");
    if(input.value == ""){
        setPinnedItems();
    }
    input.addEventListener("focusout", function() {
        input.value = "";
        reloadSuggestions();
        input.setAttribute("placeholder", "Panda Schedule");
    });
    if(highest == 0 && input.value.length != 0 && input.value != "?" || input.value.length / 5 > highest && input.value.length != 0 && input.value != "?"){
        items.innerHTML = "<span>No results found</span>";
        numberOfHighest = 1;
        root.style.setProperty("--search-bar-height", (numberOfHighest + 1) * 50 + "px");
    }
}
input.addEventListener("keyup", reloadSuggestions);
input.addEventListener("focusin", function(){
    setPinnedItems();
});
function setPinnedItems () {
    items.innerHTML = "";
    
    for(let i = 0; i < pinned.length; i ++){
        let div = document.createElement("div");
        div.innerHTML = pinned[i][0];
        items.appendChild(div);
    }
    root.style.setProperty("--search-bar-height", (pinned.length + 1) * 50 + "px")
}
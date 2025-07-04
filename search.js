//Root for css variable changing
var root = document.documentElement;

var screens = document.getElementsByClassName("screen");
var tabs = document.getElementsByClassName("tab");

//Search bar suggestions
var input = document.getElementById("search-input");
var items = document.getElementById("search-results");
const searchItems = [
    "New Schedule",
    "Open Schedule",
    "Something Else",
    "Another Option",
    "More Options",
    "Last Option",
    "Yet Another Option",
    "Final Option",
    "Example Schedule",
    "Sample Schedule",
    "another thing for testing",
    "an",
    "lan"
];
const reloadSuggestions = function(){
    items.innerHTML = "";
    var values = [];
    for(var k = 0; k < searchItems.length; k ++){
        values[k] = 0;
        for(var i = 0; i < input.value.length; i ++){
            for(var j = input.value.length - i; j > 0; j --){
                let substring = input.value.substr(i, i + j);
                if(searchItems[k].toLowerCase().includes(substring.toLowerCase())){
                    values[k] += substring.length;
                }
                if(searchItems[k].toLowerCase().startsWith(substring.toLowerCase()) && input.value.includes(" " + substring.toLowerCase()) || searchItems[k].toLowerCase().startsWith(substring.toLowerCase()) && input.value.startsWith(substring.toLowerCase())){
                    values[k] ++;
                } else if(searchItems[k].toLowerCase().includes(" " + substring.toLowerCase()) && input.value.includes(" " + substring.toLowerCase()) || searchItems[k].toLowerCase().includes(" " + substring.toLowerCase()) && input.value.startsWith(substring.toLowerCase())){
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
            items.innerHTML += "<div>" + searchItems[k] + "</div>";
            numberOfHighest ++;
        }
    }
    root.style.setProperty("--search-bar-height", `${3.125 * numberOfHighest + 3.125}rem`);
    if(input.value == ""){
        items.innerHTML = "";
        input.setAttribute("placeholder", "Press ? for help");
        root.style.setProperty("--search-bar-height", `3.125rem`);
    }
    input.addEventListener("focusout", function() {
        input.setAttribute("placeholder", "Panda Schedule");
    });
    if(highest == 0 && input.value.length != 0 && input.value != "?" || input.value.length / 5 > highest && input.value.length != 0 && input.value != "?"){
        items.innerHTML = "<span>No results found</span>";
        numberOfHighest = 1;
        root.style.setProperty("--search-bar-height", `${3.125 * numberOfHighest + 3.125}rem`);
    }
}
input.addEventListener("keyup", reloadSuggestions);
//Search bar suggestions
var input = document.getElementById("search-input");
var items = document.getElementById("search-results");
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
    root.style.setProperty("--search-bar-height", (numberOfHighest + 1) * pxify(3.125) + "px");
    if(input.value == ""){
        setPinnedItems();
    }
}
input.addEventListener("focusout", function() {
    
    input.value = "";
    input.setAttribute("placeholder", "Panda Schedule");
    items.innerHTML = "";
});
input.addEventListener("keyup", reloadSuggestions);
input.addEventListener("focusin", function(){
    setPinnedItems();
    
});
function setPinnedItems () {
    items.innerHTML = "";
    
    for(let i = 0; i < pinned.length; i ++){
        let div = document.createElement("div");
        div.innerHTML = `<p>${pinned[i][0]}</p>`;
        items.appendChild(div);
        div.num = i;
        div.addEventListener("mousedown", function(){
            
            pinned[this.num][1]();
        });
    }
    root.style.setProperty("--search-bar-height", (pinned.length + 1) * pxify(3.125) + "px")
}
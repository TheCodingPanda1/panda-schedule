var input = document.getElementsByTagName("input")[0];
var output = document.getElementById("itemHolder");
var items = ["New tab", "Settings", "Open sidebar", "Create task", "Switch to day view", "Switch to week view", "Switch to month view"];
var synonyms = [["new", "create", "open"], ["tab", "window"], ["settings", "preferences"], ["switch", "change", "move"], ["sidebar", "pannel"]];
var inputWords;
var deepInputWords;
input.addEventListener("keyup", function(){
    inputWords = [""];
    deepInputWords = [];
    var wordOn = -1;
    if(input.value[0] != " "){
        wordOn = 0;
    }
    for(var i = 0; i < input.value.length; i ++){
        if(input.value[i + 1]){
            if(input.value[i] == " " && input.value[i + 1] != " "){
                wordOn ++;
                inputWords[wordOn] = "";
            }
        }
        if(input.value[i] != " "){
            inputWords[wordOn] += input.value[i];
        }
    }
    var done;
    for(var i = 0; i < inputWords.length; i ++){
        done = false;
        for(var j = 0; j < synonyms.length; j ++){
            for(var k = 0; k < synonyms[i].length; k ++){
                if(inputWords[i].toLowerCase() == synonyms[j][k]){
                    deepInputWords[deepInputWords.length] = synonyms[j];
                } else if(!done){
                    deepInputWords[deepInputWords.length] = inputWords[i];
                    done = true;
                }
            }
        }
    }
    console.log(deepInputWords);
});
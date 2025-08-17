var elementSelects = document.getElementsByClassName("input");
var selects = [].slice.call(elementSelects);
var root = document.documentElement;
var inputSelected = false;

function setUpInputs(){
    selects = [].slice.call(elementSelects);
    for (let i = 0; i < selects.length; i++) {
        let select = selects[i];
        
        // Store initial order
        let elements = Array.from(select.children);
        elements.forEach((el) => {
            el.addEventListener("click", function(){
                setFirst(this);
            });
        }); 
    }
};
function setFirst(element, external = false){
    let normalOrder = [];
    console.log(element);
    for(let j = 0; j < element.parentElement.children.length; j ++){
        normalOrder[j] = element.parentElement.children[j];
    }
    // Use normalOrder.length for original count
    // Use CSS variable for item height (matches your style)
    element.parentElement.value = element.innerText;

    let itemHeight = element.getBoundingClientRect().height + 10;
    let menuHeight = itemHeight * normalOrder.length;
    root.style.setProperty("--menu-height", menuHeight + "px");
    var parentElement = element.parentElement;
    setTimeout(() => {
        if(!inputSelected && !external){
            parentElement.classList.add("selected");
            inputSelected = true;
            console.log("selected");
        } else {
            inputSelected = false;
            parentElement.textContent = "";
            var newArray = normalOrder.slice();
                    
            newArray.splice(newArray.indexOf(element), 1);
            newArray.unshift(element);
            for(var j = 0; j < newArray.length; j ++){
                parentElement.appendChild(newArray[j]);
            }
            parentElement.classList.remove("selected");
        }
    },1);
}
setUpInputs();
function closeInput(element) {
    element.classList.remove("selected");
}

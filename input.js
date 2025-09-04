var elementSelects = document.getElementsByClassName("input");
var selects = [].slice.call(elementSelects);
var root = document.documentElement;
var inputSelected = false;
var selected = false;

function setUpInputs(){
    selects = [].slice.call(elementSelects);
    for (let i = 0; i < selects.length; i++) {
        let select = selects[i];
        selects[i].addEventListener("focusout", function(){
            closeInput(this);
        });
        
        // Store initial order
        let elements = Array.from(select.children);
        elements.forEach((el) => {

            el.addEventListener("click", function(){
                setFirst(this);
            });
        }); 
    }
};
function toggleInput(element) {
  if (selected) {
    element.classList.remove("selected");
    selected = false;
  } else {
    element.classList.add("selected");
    selected = true;
  }
}
function setFirst(element, external = false){
    let immediateOrder = element.parentElement.getAttribute("normalorder");
    const ids = JSON.parse(immediateOrder);
    const normalOrder = ids.map(id => document.getElementById(id));
    let minusAmount = 0;
    // Use normalOrder.length for original count
    // Use CSS variable for item height (matches your style)
    element.parentElement.value = element.innerText;

    let itemHeight = element.getBoundingClientRect().height / scale;
    let menuHeight = itemHeight * normalOrder.length;
    root.style.setProperty("--menu-height", menuHeight + "px");
    var parentElement = element.parentElement;
    setTimeout(() => {
        parentElement.textContent = "";
        var newArray = Array.from(normalOrder);
                    
        newArray.splice(newArray.indexOf(element), 1);
        newArray.unshift(element);
        for(var j = 0; j < newArray.length; j ++){
            parentElement.appendChild(newArray[j]);
        }
        if(!external){
            toggleInput(parentElement);
        }
    },1);
}
setUpInputs();
function closeInput(element) {
    element.classList.remove("selected");
}

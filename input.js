var elementSelects = document.getElementsByClassName("input");
var selects = [].slice.call(elementSelects);
var root = document.documentElement;
var inputfocused = false;
var focused = false;

function setUpInputs(){
    console.log("setUpInputs");
    selects = [].slice.call(elementSelects);
    for (let i = 0; i < selects.length; i++) {
        let select = selects[i];
        
        // Store initial order
        let elements = Array.from(select.children);
        elements.forEach((el) => {
            if(!el.hasEventListener){
                el.addEventListener("mousedown", function(){
                    console.log("el");
                    setFirst(this);
                });
                el.hasEventListener = true;
            }
        }); 
        select.style.width = elements[0].clientWidth + "px";
    }
};
function toggleInput(element) {
    console.log("yay");
  if (focused == true) {
    element.classList.remove("selected");
    focused = false;
    root.style.setProperty("--input-width", "fit-content");
    element.style.width = element.children[0].clientWidth + "px";
  } else {
    element.classList.add("selected");
    focused = true;
    element.focus();
    var width = 0;
    var highestWidth = 0;
    for(var i = 0; i < element.children.length; i ++){
        width = element.children[i].clientWidth;
        if(width > highestWidth){
            highestWidth = width;
        }
    }
    root.style.setProperty("--input-width", highestWidth - pxify(2.5) + "px");
    element.style.width = highestWidth + "px";
    setTimeout(function(){
        console.log("yay!");
        focused = true;
    }, 2);
    
  }
}
function setFirst(element, external = false){
    console.log("yay");
    let immediateOrder = element.parentElement.getAttribute("normalorder");
    const ids = JSON.parse(immediateOrder);
    const normalOrder = ids.map(id => document.getElementById(id));
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
    console.log("yay");
    element.classList.remove("focused");
    focused = false;
    root.style.setProperty("--input-width", "fit-content");
    element.style.width = element.children[0].clientWidth + "px";
}

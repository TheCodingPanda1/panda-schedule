var elementSelects = document.getElementsByClassName("input");
var selects = [].slice.call(elementSelects);
var root = document.documentElement;
var inputSelected = false;

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
                console.log("YYYYYYAAAAAAAYYYYYY")
            });
        }); 
    }
};
function setFirst(element, external = false){
    let immediateOrder = element.parentElement.getAttribute("normalorder");
    console.log(immediateOrder);
    const ids = JSON.parse(immediateOrder);
    console.log(ids);
    const normalOrder = ids.map(id => document.getElementById(id));
    console.log(normalOrder);
    console.log(element);
    let minusAmount = 0;
    // Use normalOrder.length for original count
    // Use CSS variable for item height (matches your style)
    element.parentElement.value = element.innerText;

    let itemHeight = element.getBoundingClientRect().height + 10;
    let menuHeight = itemHeight * normalOrder.length;
    root.style.setProperty("--menu-height", menuHeight + "px");
    var parentElement = element.parentElement;
    setTimeout(() => {
        parentElement.textContent = "";
        var newArray = Array.from(normalOrder);
        console.log(normalOrder);
                    
        newArray.splice(newArray.indexOf(element), 1);
        newArray.unshift(element);
        for(var j = 0; j < newArray.length; j ++){
            parentElement.appendChild(newArray[j]);
        }
        console.log(parentElement, parentElement.nodeType, parentElement.nodeName);
        
        if(!external){
            if(parentElement.classList.contains("selected")){
                console.log("AYAY");
                closeInput();
            } else {
                console.log(parentElement)
                parentElement.classList.add("selected");
                console.log(parentElement, parentElement.classList, parentElement.classList.contains, parentElement.classList.contains("selected"));
                
            }
            
        }
    },1);
}
setUpInputs();
function closeInput(element) {
    element.classList.remove("selected");
    console.log("YAY");
}

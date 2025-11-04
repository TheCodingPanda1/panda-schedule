var elements = document.getElementsByClassName("sticky");

function resetElements(){
    
    for(var i = 0; i < elements.length; i ++){
        var element = elements[i];
        var rawSnapTop = element.getAttribute("top");
        var snapTop;
        if(rawSnapTop.includes("rem")){
            snapTop = pxify(parseFloat(rawSnapTop.replace("rem", "")));
        }
        if(rawSnapTop.includes("px")){
            snapTop = parseFloat(rawSnapTop.replace("px", ""));
        }
        if(rawSnapTop.includes("var")){
            snapTop = pxCssVar(rawSnapTop.replace("var", ""));
        }
        var rawSnapBottom = element.getAttribute("bottom");
        var snapBottom;
        if(rawSnapBottom.includes("rem")){
            snapBottom = pxify(parseFloat(rawSnapBottom.replace("rem", "")));
        }
        if(rawSnapBottom.includes("px")){
            snapBottom = parseFloat(rawSnapBottom.replace("px", ""));
        }
        if(rawSnapBottom.includes("var")){
            snapBottom = pxCssVar(rawSnapBottom.replace("var", ""));
        }
        var rawSnapLeft = element.getAttribute("left");
        var snapLeft;
        if(rawSnapLeft.includes("rem")){
            snapLeft = pxify(parseFloat(rawSnapLeft.replace("rem", "")));
        }
        if(rawSnapLeft.includes("px")){
            snapLeft = parseFloat(rawSnapLeft.replace("px", ""));
        }
        if(rawSnapLeft.includes("var")){
            snapLeft = pxCssVar(rawSnapLeft.replace("var", ""));
        }
        var rawSnapRight = element.getAttribute("right");
        var snapRight;
        if(rawSnapRight.includes("rem")){
            snapRight = pxify(parseFloat(rawSnapRight.replace("rem", "")));
        }
        if(rawSnapRight.includes("px")){
            snapRight = parseFloat(rawSnapRight.replace("px", ""));
        }
        if(rawSnapRight.includes("var")){
            snapRight = pxCssVar(rawSnapRight.replace("var", ""));
        }
    }
}
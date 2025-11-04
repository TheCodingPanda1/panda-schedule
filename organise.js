var startPoint = 0;
var createTasks = document.getElementsByClassName("createTask");
var currentElement;
var interval;
var mockTask;
var shift = false;
var enter = false;
var subjects = [];
for(var i = 0; i < createTasks.length; i ++){
    createTasks[i].addEventListener("mousedown", function(){
        
        if(this.getElementsByClassName("mockTask").length == 0){
            startPoint = mouseY - this.getBoundingClientRect().top;
            mockTask = document.createElement("div");
            mockTask.style.top = startPoint + "px";
            mockTask.setAttribute("class", "mockTask");
            this.getElementsByClassName("createScroller")[0].appendChild(mockTask);
            currentElement = this;
            var stillGo = true;
            this.getElementsByClassName("createScroller")[0].addEventListener("mouseup", function(){
                
            });
            interval = setInterval(function(){
                console.log("yay±");
                var hours = Math.floor(mockTask.getBoundingClientRect().height / 120);
                var minutes = Math.floor((mockTask.getBoundingClientRect().height / 120 - hours) * 60);
                var string = "";
                if(hours == 1){
                    string += "1 hour";
                }
                if(hours >= 2){
                    string += hours + " hours";
                }
                if(hours >= 1 && minutes >= 1){
                    string += ", ";
                }
                if(minutes == 1){
                    string += "1 minute";
                }
                if(minutes >= 2){
                    string += minutes + " minutes";
                }
                root.style.setProperty("--mockTaskContent", JSON.stringify(string))
                currentElement.getElementsByClassName("createScroller")[0].scrollTop = currentElement.getElementsByClassName("createScroller")[0].scrollHeight;
                if(mockTask.getBoundingClientRect().height + startPoint <= currentElement.getBoundingClientRect().height - pxify(3.125)){
                    mockTask.style.height = mouseY - currentElement.getBoundingClientRect().top - startPoint + "px";
                } else {
                    mockTask.style.height = parseInt(mockTask.style.height) + (mouseY - (currentElement.getBoundingClientRect().top + currentElement.getBoundingClientRect().height - 50)) / 10 + "px";
                    stillGo = false;
                }
            }, 1000/60);
        }
        
    });
}
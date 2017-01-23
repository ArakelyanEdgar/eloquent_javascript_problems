var field = document.querySelector("input");

//we want to do it so that Q, W, and X cannot be inputted into the field node

field.addEventListener("keydown", function(event){

    if (event.keyCode == "Q".charCodeAt(0) || event.keyCode == "W".charCodeAt(0) ||
        event.keyCode == "X".charCodeAt(0) ){
            console.log(event.keyCode + " is not allowed!")
            event.preventDefault();
        }
})
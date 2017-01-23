document.body.addEventListener("mouseover", function(event){
    //creating a div element per event call and setting its class 
    //so that it inherits the style properties we want
    var div_element = document.createElement("div");
    div_element.className = "trail";

    div_element.style.left = (event.pageX - 4) + "px";
    div_element.style.top = (event.pageY - 4) + "px";

    document.body.appendChild(div_element);
})
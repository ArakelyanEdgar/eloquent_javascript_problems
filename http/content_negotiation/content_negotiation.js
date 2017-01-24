var req = new XMLHttpRequest();


var par = document.createElement("p");
//simple ajax request, we want to make the text content of par to be
//assigned to the text response, and then we want to do it so that the text
//response is negotiated to be json or plain or text
req.open("GET", "http://eloquentjavascript.net/author", true);
req.setRequestHeader("Accept", "application/json");

req.addEventListener("load", function(){
    console.log(req.responseText)
    par.textContent = req.responseText;
})


req.send(null);
document.body.appendChild(par);
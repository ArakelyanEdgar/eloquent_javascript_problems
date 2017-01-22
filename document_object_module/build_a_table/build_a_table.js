var Mountains = require("./mountains.js");

//this function will build a table in html using the array of objects
//given in the var mountains
function buildTable(data){
    //this will hold the header names for the table
    var header_names_array = Object.keys(Mountains[0]);
    var header_names_length = header_names_array.length();
    //creating the table and appending it onto the html
    var main_table = document.createElement("table");
    document.body.appendChild(main_table);
    
    //now we must append the header rows onto the table as well;

    for (var i = 0; i < header_names_length; i++){
        //create header node and set its text equal to header string
        //then append it onto the table
        var new_th = document.createElement("th");
        new_th.textContent = header_names_array[i];
        main_table.appendChild(new_th);
    }


}

console.log(Object.keys(Mountains[0]))
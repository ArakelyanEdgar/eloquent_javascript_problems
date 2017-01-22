var Mountains = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];


//this function will build a table in html using the array of objects
//given in the var mountains
function buildTable(data){
    //this will hold the header names for the table
    var header_names_array = Object.keys(data[0]);
    var header_names_length = header_names_array.length;
    //creating the table and appending it onto the html
    var main_table = document.createElement("table");
    
    //now we must append the header rows onto the table as well;
    var tr_ = document.createElement("tr");

    for (var i = 0; i < header_names_length; i++){
        //create header node and set its text equal to header string
        //then append it onto the table
        
        var new_th = document.createElement("th");
        var text = document.createTextNode(header_names_array[i]);
        new_th.appendChild(text);
        tr_.appendChild(new_th);
    }
    main_table.appendChild(tr_);
    //now we must input the actual data
    var row_length = data.length;
    for (var i = 0; i < row_length; i++){
        //create table row and append onto main_table
        var tr_ = document.createElement("tr");
        for (var j = 0; j < header_names_length; j++){
            //then for each tr, we must attach all the <td>s 
            var new_td = document.createElement("td");
            var current_data = data[i];
            var td_data = current_data[header_names_array[j]];
            var text_ = document.createTextNode(td_data);
            new_td.appendChild(text_);
            tr_.appendChild(new_td);
        }
        main_table.appendChild(tr_);
    }

    return main_table;
}
document.body.appendChild(buildTable(Mountains));
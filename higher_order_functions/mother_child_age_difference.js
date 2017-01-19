//this array will hold the exported ancestry array in the file therewithin
var ancestry_array = require("./mother_child_data.js");
ancestry_array = JSON.parse(ancestry_array);

//making an object whose references and point to the object associated 
// with that person.

var byName = {}
ancestry_array.forEach(function(element){
    byName[element.name] = element;
})

var counter = 0;

var net_age_difference = ancestry_array.reduce(function(net_diff, curr_person){
        if (byName[curr_person.mother]){
            counter++;
            return  net_diff + curr_person.born - byName[curr_person.mother].born;
        }
        else {
            return net_diff;
        }
}, 0)

console.log(net_age_difference/counter);

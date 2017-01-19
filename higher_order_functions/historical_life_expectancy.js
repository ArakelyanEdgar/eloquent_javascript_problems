var ancestry_array = require("./mother_child_data.js");
ancestry_array = JSON.parse(ancestry_array);



//we want to create separate arrays for each century, and then map them 
//according to their age

var sixteenth_century = ancestry_array.filter(function(person){
    return person.born >= 1500 && person.born < 1600;
}).map(function(person){
    return person.died - person.born;
})

var seventeenth_century = ancestry_array.filter(function(person){
    return person.born >= 1600 && person.born < 1700;
}).map(function(person){
    return person.died - person.born;
})

var eighteenth_century = ancestry_array.filter(function(person){
    return person.born >= 1700 && person.born < 1800;
}).map(function(person){
    return person.died - person.born;
})

var nineteenth_century = ancestry_array.filter(function(person){
    return person.born >= 1800 && person.born < 1900;
}).map(function(person){
    return person.died - person.born;
})

var twentyth_century = ancestry_array.filter(function(person){
    return person.born >= 1900 && person.born < 2000;
}).map(function(person){
    return person.died - person.born;
})

var twenty_first_century = ancestry_array.filter(function(person){
    return person.born >= 2000 && person.born < 2100;
}).map(function(person){
    return person.died - person.born;
})

//now we must compute the average age for each of these arrays

function average(array){
    function plus(a, b){ return a + b};
    return array.reduce(plus)/array.length;s
}

console.log(average(seventeenth_century))
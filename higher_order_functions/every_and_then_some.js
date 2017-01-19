//the function every will check if every element in an array is true, or false,
// for the given function

function every(array, user_function){
    var bool = true;
    var length = array.length;
    for (var i = 0; i < length; i++){
        bool = user_function(array[i]);
        if (bool == false){
            return false;
        }
    }
    return bool;
}

//the function some is similar to every except it returns true 
//if there is at least one element that returns true for the user function
function some(array, user_function){
    var bool = false;
    var length = array.length;
    for (var i = 0; i < length; i++){
        bool = user_function(array[i]);
        if (bool == true){
            return true;
        }
    }
    return bool;
}


console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
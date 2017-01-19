var arrays = [[1, 2, 3], [4, 5], [6]];

//we gotta use reduce and concat to make this array of arrays into a
//single array

var flattened = arrays.reduce(function(previous_array, current_array){
    return previous_array.concat(current_array);
}, [])

console.log(flattened);
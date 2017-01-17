function array_to_list(array){
    
    var length = array.length;
    var list = {};
    var current_obj = list;

    for (var i = 0; i < length; i++){
        current_obj.value = array[i];
        if (i == length - 1){
            current_obj.rest = null;
        }
        else {
            current_obj.rest = {};
            var temp_obj = current_obj.rest;
            current_obj = temp_obj;
        }
    }

    current_obj = null;

    return list;
}

function list_to_array(list, array){

    if (!array){
        var array = [];
    }

    for (var reference in list){
        if (reference == "value"){
            array.push(list[reference]);
        }
        if (reference == "rest"){
            if (list[reference] != null){
                list_to_array(list[reference], array)
            }
            else {
                return array
            }
        }
    }

    return array;
}

console.log(list_to_array(array_to_list([0, 5, 10])));
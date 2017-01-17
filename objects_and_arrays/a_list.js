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

function prepend(element, list){

    var temporary_array = list_to_array(list);
    var lenght = temporary_array.length;

    temporary_array.unshift(element);

    var prepend_list = array_to_list(temporary_array);

    return prepend_list;
}

function nth(list, number){

    var temp_array = list_to_array(list);
    var length = temp_array.length;

    if ((number >= length) || (number < 0)){
        return "Thats not a valid index!"
    }
    else{
        return temp_array[number];
    }
}

console.log(nth(array_to_list([10, 20, 30]), 1))

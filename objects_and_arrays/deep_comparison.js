function deepEqual(value_1, value_2, bool){

    if (!bool){
        bool = true;
    }
    var type_value = typeof(obj1);
    if (type_value != "object" || type_value == null){
        if (value_1 == value_2){
            bool = true
        }
        else{
            bool = false;
        }
    }
    else {
        var new_bool = false;
        for (var property_1 in value_1){
            var temp_prop_2;
            for (var property_2 in value_2){
                if (property_2 == property_1){
                    temp_prop_2 = property_2;
                    new_bool = true;
                }
            }
            if (new_bool == false){
                bool = false;
            }
            else{
                deepEqual(value_1[property_1], value_2[temp_prop_2], bool)
            }
        }
    }

    return bool;

}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
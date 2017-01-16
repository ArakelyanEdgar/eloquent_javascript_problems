function reversing_an_array{ 

    this.reverse_array = function(array){

        var length = array.length;
        var reversed_array = [];

        for (var i = length - 1; i >= 0; i--){
            reversed_array.push(array[i]);
        }

        return reversed_array;
    }
}

module.exports = reversing_an_array;

function sum_of_a_range(){
    this.range = function (start, end, increment){

        var range_array = [];
        
        if (!increment){
            increment = 1;
        }


        if (start <= end){
            while (start <= end){
                range_array.push(start);
                start += increment;
            }
        }
        else {
            while (start > end){
                range_array.push(start);
                start += increment;
            }
        }

        return range_array;
    }
 }

module.exports = sum_of_a_range;
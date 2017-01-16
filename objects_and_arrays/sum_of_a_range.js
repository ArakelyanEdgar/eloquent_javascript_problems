function range(start, end, increment){

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

console.log(range(1, 100, 10));
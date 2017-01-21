function MultiplicatorUnitFailure(a, b) {
    
    //this will recursively assign a value that is a * b
    this.run = reliableMultiply(a, b);
}

//we've wrapped primitiveMultiply into a larger function so that if\
// primitiveMultiply throws an error then we can catch it and then we can
//console.log the error value which is an instance of the 
//mulitplicator... failure function which has a method that 
//recursively calls reliableMultiply, thus this recursive process
//will eventually return the desired output
function reliableMultiply(a,b){
    
    
    function primitiveMultiply(a, b) {
        if (Math.random() < 0.5)
            return a * b;
        else
            throw new MultiplicatorUnitFailure(a, b);
    }

    return primitiveMultiply(a,b);
}

try{
    console.log(reliableMultiply(8, 8));
}
catch(error){
    console.log(error.run);
}
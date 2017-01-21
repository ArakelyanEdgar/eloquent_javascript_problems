(function(exports){
   
    var months = ["Jan", "Feb", "Mar", "Apr",
               "May", "June", "July", "August", "Sept", "Oct",
               "Nov", "Dec"];
    //easy to understand functions, what is important is that
    //exports refers to this.month which is an object, where this
    //is the global object, thus we are essentially importing
    //a module internally
    exports.name = function(number){
        return months[number];
    }
    exports.number = function(str){
        return months.indexOf(str);
    }

})(this.month)
//see that this refers to the global object, thus month, and therefore
//this function is modularized into this file

console.log(month.name(2));
console.log(month.number("Nov"));

//NOTE that this solution won't run on node as node doesn't allow
//this sort of modularization


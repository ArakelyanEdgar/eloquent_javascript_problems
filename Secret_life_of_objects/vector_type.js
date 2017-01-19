//creating a constructor function, Vector, that essentially
//lays out the x and y coordinates for each instance

function Vector(x, y){
    this.x = x;
    this.y = y;
}

//now we want to create prototype methods that add two vectors

Vector.prototype.plus = function(other_vector){
  return new Vector(  this.x = this.x + other_vector.x,
  this.y = this.y + other_vector.y)
}
Vector.prototype.minus = function(other_vector){
    return new Vector(  this.x = this.x - other_vector.x,
  this.y = this.y - other_vector.y)
}

//we also want to create a method for Vector that finds the euclidean
//length of the vectors

Vector.prototype.length = function(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}


console.log(new Vector(1, 2).plus(new Vector(2, 3)));

console.log(new Vector(1, 2).minus(new Vector(2, 3)));

console.log(new Vector(3, 4).length());

console.log(new Vector(1,2));
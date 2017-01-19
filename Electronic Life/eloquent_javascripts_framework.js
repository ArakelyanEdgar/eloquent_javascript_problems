//this whole grid interface is made by eloquent javascript
//I will be using my own comments to explain whats going on
//in order to demonstrate my understanding
//I will be using this interface in order to solve the problems
//given as is intended by the author


//creating a grid constructor, where this.space creates an array with 
//size width*height which is essentially the area
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
//a property that will check if a vector is inside the grid
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};
//.get accesses the index of any coordinate on the grid
//it does this by multiplying the width by the height coordinate
//in order to point the vector in the right direction
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};
//this will input a (intended) string value into the coordinate
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};
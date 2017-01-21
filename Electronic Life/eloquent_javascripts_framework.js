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

//this directions object will hold the possible vector changes we will have to do 
//when we want an element on the grid to move a certain way, n is (0, -1) because
// decreasing y will move the element in question upwards on the grid.
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

//random element is a function that expects to receieve an array
//that holds certain possible directions, thus randomELement will
//randomly choose one of these elements, that are in fact directions
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//this.direction will force the critter to hold a property that 
//will tell it which direction to move in another function
function BouncingCritter() {
  this.direction = randomElement(directionNames);
};

//view will be an object that has a property called look that
//will see what char is held in the grid in that direction given.
//if the .look(direction) finds that there is not open space in the given
//direction, it will then force the this.direction to be assigned to
//a direction in which there is open space, or force it to move south.
//by doing this we force this.direction to never be assigned null
//then it returns an object telling its action type and direction.
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

//now we want to build an all encompassing object, called world, 
//that will take arguements for the grid and the legend, where each of
//these will are assigned to their own constructors.

//this function will take the legend object, and a char, and if 
//the char is " " meaning it is open space, then we return null
//else we want to make an instance of the chars constructor and give
//it an originchar property to make it clear what the element is from. 
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

//this is the all encompassing constructor. it will take a map argument,
//a grid and recreate it using the Grid constructor in order to inherit 
//from the grid constructor properties. Then we create a property that inherits
//the legend object.

//a grid plan might look something like this:
/*

var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

and this plan array would be passed as map into world
*/


function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  //this will assign the char values into our this.grid.space by using 
  //this.grid.set and passing the coordinates and passing it a char 
  //that will be understood by using the legend
  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}

// this function will be able to read an element, and return 
//what type of char it is. Remember that element is an instance of a
//constructor function for its .originchar, unless it is a space char
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

//.toString is a simple function, it will create a string that represents 
//the current grid's values by looping over the this.grid.space via
//this.grid.get
World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};
//this whole grid interface is made by eloquent javascript
//I will be using my own comments to explain whats going on
//in order to demonstrate my understanding
//I will be using this interface in order to solve the problems
//given as is intended by the author

//these vector constructors will be able to store coordinates 
//for the grid essentially
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

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
//var directionNames is an example of one

var directionNames = "n ne e se s sw w nw".split(" ");

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

//and this plan array would be passed as map into world


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

//wall is an empty constructor becuase we don't want a wall contstructor
//to do anything
function Wall(){

}

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});

//now we want to give World properties that will allow its
//chars to move from vector(a,b) to another vector
//we also want to keep an array that says which chars have acted
//so that when we loop over the array, that we do not give a turn
//to move to a char that has already moved

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    //checking if the char in question can move and if it hasn't moved yet
    if (critter != null && critter != "#" && critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

//this will be the method that will allow us to move chars around the 
// grid
World.prototype.letAct = function(critter, vector) {
  //remember that critter is an object with the method act 
  // which returns an object saying several things about the chars
  //acting characteristics
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    //checking if the destination is valid and if it is an open space
    //if it is then we want to set the coordinate for the current grid 
    //space occupied by the char to be open, or null, and to set the vector
    //space in the grid to be whatever checkDestination says it to be
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

//now we define view

function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

View.prototype.look = function(dir) {
  //finding the coordinate in which the char wishes to move
  var target = this.vector.plus(directions[dir]);
  //if this vector is available inside the grid
  //then we will return a value holding the char inside the
  //wanted grid space, else we will say it is a wall char, thus 
  //saying that movement into that vector is impossible
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};

//Given a char, check if the surround directional vectors lead to the char wanted
//if so, return them in as an array showing which directions they are.
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};

//uses findAll to return a single element rather than an array
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return randomElement(found);
};

//here we will run 5 frames of world, because of view the chars will move around
for (var i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}


//This is an object that has the property of being locked or unlocked.
//if it is locked then accessing _content should return an error 
//unless this.locked is false.
var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

//this function will run when this.locked = false
function withBoxUnlocked(body) {
    var check_lock
    //if already open then we want to make sure we know this for when 
    //we finish so that we can make sure not to lock it, else
    //we need to unlock the lock and then lock it again later
    if (box.locked == false){
        check_lock = true;
    }
    else {
        check_lock = false;
        box.locked = false;
    }
    
    //run the user defined function, body
    try {
        body();
    }
    finally {
        //making sure that the box gets locked no matter if an 
        //exception is thrown or not, unless check_lock is true
        if (check_lock){
            box.locked = false;
        }
        else {
            box.locked = true;
        }
    }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}

console.log(box.locked)

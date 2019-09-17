// A Vector Type: 

// Solution 1: 

class Vec { 
  constructor(x, y){
    this.x = x;
    this.y = y;
  }    

  plus(vector){
    const sumX = this.x + vector.x;
    const sumY = this.y + vector.y;
    return new Vec(sumX, sumY);
  }

  minus(vector){
    const subX = this.x - vector.x;
    const subY = this.y - vector.y;
    return new Vec(subX, subY);
  }

  get length(){
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

// Groups: 

// Solution 1:
// class Group {
//   constructor(){
//     this.group = [];
//   }

//   add(member){
//     if(!this.group.includes(member)){
//       this.group.push(member);
//     }
//     return this.group
//   }

//   delete(member){
//     if (this.group.includes(member)) {
//       this.group = this.group.filter(mem => {
//         return mem !== member
//       })
//     }
//     return this.group;
//   }

//   has(member){
//    return this.group.includes(member)
//   }

//   deleteAll(){
//     this.group = [];
//   }

//   static from(iterable){
//     const newGroup = new Group();
//     for(let member of iterable){  
//       newGroup.add(member)
//     }
//     return newGroup;
//   } 

// }

// Solution 2: 

class Group {
  constructor(){
    this.content = [];
  }

  add(member){
    for (let i = 0; i < this.content.length; i++) {
      if (member === this.content[i]) {
        return this.content
      }
    }
    this.content.push(member);
    return this.content;
  }

  delete(member){
    const filteredGroup = [];
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i] !== member) {
        filteredGroup.push(this.content[i]);
      }
    }
    this.content = filteredGroup;
    return this.content
  }

  has(member){
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i] === member) {
        return true;
      }
    }
    return false;
  }

  deleteAll(){
    this.content = [];
  }

  static from(iterable){
    const newGroup = new Group();
    for(let member of iterable){  
      newGroup.add(member);
    }
    return newGroup;
  } 
}


// Group Iterator-

// Solution 1: 

class GroupIterator {
  constructor(group){
    this.member = 0;
  }

  next(){
    if(group.content[this.member] === group.content[group.content.length]) return { done: true };

    let value = {
      member: group.content[this.member],
    }

    this.member++;
    return { value, done: false };
  }
}

const group = new Group();
group.add("dog")
group.add("cat")
group.add("frog")
group.add("fish")
Group.prototype[Symbol.iterator] = function(){
  return new GroupIterator(group);
}


for(let { member } of group){
  console.log(member);
}

// Borrowing a Method:

const map = new Map();
map.set("dog", "calvin");
map.set("cat", "stretch");
map.set("hasOwnProperty", "It does indeed");
// this hides the prototypes hasOwnProperty property with this instances.

console.log(Map.hasOwnProperty.call(map, "dog"));
// => true
console.log(Map.hasOwnProperty.call(map, "cat"));
// => true
console.log(Map.hasOwnProperty.call(map, "hasOwnProperty"));
// => true
console.log(Map.hasOwnProperty.call(map, "fish"));
// => false




// This makes sure the data is exported in node.js —
// `require('./path/to/exercises.js')` will get you the array.
if (
    typeof module != "undefined" &&
    module.exports &&
    (typeof window == "undefined" || window.exports != exports)
)
    module.exports = Group;
if (typeof global != "undefined" && !global.Group) global.Group = Group;

if (
  typeof module != "undefined" &&
  module.exports &&
  (typeof window == "undefined" || window.exports != exports)
)
  module.exports = GroupIterator;
if (typeof global != "undefined" && !global.GroupIterator) global.GroupIterator = GroupIterator;
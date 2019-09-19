const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
  const graph = Object.create(null);
  function addEdge(from, to) {
    // from = "Alice's House";
    // to = "Bob's House";
    if (graph[from] == null) {
      // if the graph does not have a key of the value bound to "from"
      // create it and its value is an array with the value bound to "to"
      graph[from] = [to];
    } else {
      // otherwise just push the current "to" into from. 
      graph[from].push(to);
    }
  }
  // this returns an array of two elements ex. ["Alice's House", "Bob's House"]
  // These are then destructed as from and to;
  for (let [from, to] of edges.map(r => r.split("-"))) {
    // starts with Alice's House as from, and "Bob's House" as to
    addEdge(from, to);
    // Then flips it.
    addEdge(to, from);
  }
  return graph;
};

const roadGraph = buildGraph(roads);
// roadGraph = {
//   "Alice's House": ["Bob's House", "Post Office", "Cabin"],
//   "Bob's House": ["Alice's House", "Town Hall"],
//   etc...
// }

const VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    // this.place = "Post Office"
    // this.parcels = [
      // the parcel is an object that has two key/value pairs
      // the place key points to the current location of the parcel
      // the address points to the address that the parcel needs to be dropped off at.
      // {place: "Post Office", address: "Cabin"}
    // ]
    // destination = "Cabin"
    if (!roadGraph[this.place].includes(destination)) {
      // ex if roadGraph["Post Office"] = ["Alice's House", "Marketplace"] DOES NOT INCLUDE
      // destination ("Cabin")
      // return the original state of the village;
      return this;
    } else {
      // otherwise, create a binding that 
      // takes the villages parcels, and maps over them
      const parcels = this.parcels.map(p => {
        // if the parcel.place DOES NOT equal the current location that the robot is at 
        // just return the parcel to the village as it hasn't been picked up by the robot yet
        // the robot isn't at the pick up location. 
        if (p.place != this.place) return p;
        // otherwise create a new object that has the place as the current destination and the address 
        // of the original parcel. 
        // this is return to the map. 
        return { place: destination, address: p.address };
      }).filter(p => p.place != p.address);
      // We then filter that list, to find any parcels that the place they are currently at 
      // DOES NOT equal the address this ensure that parcels that need to be delivered are. 
      return new VillageState(destination, parcels);
      // we then return a new VillageState with the current place being where we moved to, 
      // and the parcels are the new reduced amount.
    }
  }
};

function runRobot(state, robot, memory) {
  // This function take's in a villageState, a robot and a memory.
  // A villageState is an object. 
  // a robot is a function 
  // memory is an array of objects 
  for (let turn = 0; ; turn++) {
    // turn represents the number of turns a robot must go through to finish delivering parcels. 
    if (state.parcels.length == 0) {
      // if the amount of parcels is 0 then return how many turns it took to finish delivering 
      // them. 
      console.log(`Done in ${turn} turns`);
      break;
    }
    // the binding action calls the robot function and passes, the current village state, and 
    // the memory in case it is needed. 
    let action = robot(state, memory);
    // the state binding is changed to the state after the move. 
    // action.direction is created by the robot function. 
    state = state.move(action.direction);
    // memory is changed to the robots previous memory. 
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
};

function randomPick(array) {
  // choice binds Math.random() * the length of an array that passed in.
  // ["Alice's House", "Marketplace"].length = 2
  let choice = Math.floor(Math.random() * array.length);
  // the array at the random index is returned. 
  return array[choice];
};

function randomRobot(state) {
  // This randomRobot function returns an object
  // the key direction points to the return value of the 
  // randomPick function
  // the argument passed in is an array from the graph. 
  // for example: roadGraph["Post Office"] = ["Alice's House", "Marketplace"]
  return { direction: randomPick(roadGraph[state.place]) };
};

VillageState.random = function (parcelCount = 5) {
  // VillageState.random points to a function that takes a default argument of parcelCount = 5
  let parcels = [];
  // for the amount of parcels.
  for (let i = 0; i < parcelCount; i++) {
    // the current address is the return value of randomPick(the argument is all the keys of roadGraph);
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      // place is equal to the return value of randomPick(the argument is all the keys of roadGraph);
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    // while the place is equal to the address keep changing the place.
    // This is so that no parcel has the same pickup location as where it needs to be delivered.
    parcels.push({ place, address });
    // parcels array receives the new parcel. 
  }
  // finally, return a new VillageState, starting at the post office and an array of parcel objects.
  return new VillageState("Post Office", parcels);
};

// runRobot(VillageState.random(), randomRobot)

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  // this function takes in two arguements
  // state which is the current villageState
  // and Memory which is an array of village state????
  if (memory.length == 0) {
    // this states that if there are no memories then set the memory = the mailRoute Array.
    memory = mailRoute;
  }
  // This returns an object with a direction that points to the first memory
  // and the memory key pointing to the memory arrays with the first sliced off. 
  return { direction: memory[0], memory: memory.slice(1) };
};
// The routeRobot must be given a memory(route) to follow.
// runRobot(VillageState.random(), routeRobot, mailRoute)

function findRoute(graph, from, to) {
  // this function takes in 3 args 
  // 1. graph = the roadGraph
  // 2. from = a starting location 
  // 3. to = where we are trying to head to. 
  let work = [{ at: from, route: [] }];
  // work is a binding that points to an array
  // this array starts with one member which is an object
  // the at key points to from, and the routes key points to an array. 
  for (let i = 0; i < work.length; i++) {
    // run the loop fro the length of the work array
    let { at, route } = work[i];
    // destructure at and route from work's element at index i. 
    for (let place of graph[at]) {
      // ex. graph["Post Office"] = ["Alice's House", "Marketplace"]
      // place = "Alice's House"
      // place = "Marketplace"
      if (place == to) return route.concat(place);
      // if the place is the same as where we are trying to get to 
      // take the route array and add the place to the route and return that array. 
      if (!work.some(w => w.at == place)) {
        // if the work Array DOES NOT have some work object where it's at key 
        // equals the place, we push in a new work object 
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
};

function goalOrientedRobot({ place, parcels }, route) {
  // This function takes in two arguements.
  // 1. it destructures from the villageState the place and the parcels 
  //    - the place is a string.
  //    - the parcels are an array of parcel objects. 
  // 2. route is the mailRoute in this case. 

  if (route.length == 0) {
    // if the route is finished 
    // we store the first parcel in a binding called parcel
    let parcel = parcels[0];

    if (parcel.place != place) { 
      // if the current parcel's location does not equal the current location 
      route = findRoute(roadGraph, place, parcel.place);
      // find route to the parcel
    } else {
      // otherwise find the route to the parcels destination 
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  // return the next direction to move in 
  // and truncate the memory to be one less that the previous memory 
  return { direction: route[0], memory: route.slice(1) };
};
 



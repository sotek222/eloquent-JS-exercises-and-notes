// Measuring a robot:

// Solution 1: 

// Using the code from ./robot.js

function runRobotWithSteps(state, robot, memory) {
  let steps = 0;
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      return steps;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    steps++;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let robot1Total = 0, robot2Total = 0;
  for (let test = 0; test < 100; test++) {
    robot1Total += runRobotWithSteps(VillageState.random(), robot1, memory1);
    robot2Total += runRobotWithSteps(VillageState.random(), robot2, memory2);
  }
  console.log("Robot #1 Average:", robot1Total / 100, "||", "Robot #2 Average:", robot2Total / 100);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

// Robot efficiency:

// Solution 1: 


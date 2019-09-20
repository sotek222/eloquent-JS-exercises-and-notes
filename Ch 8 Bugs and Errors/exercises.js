// RETRY: 

// 1st Solution: 

class MultiplicatorUnitFailure extends Error {};

function primitiveMultiply(a, b){
  if(Math.floor(Math.random() * 100) >= 80) return a * b;   
  throw new MultiplicatorUnitFailure("Failed to Multiply");
};

function wrapper(){
  for(;;){
    try {
      console.log(primitiveMultiply((Math.floor(Math.random() * 100)), Math.floor((Math.random() * 100))));
      break;
    } catch (error){
      if(error instanceof MultiplicatorUnitFailure){
        console.log(error);
      } else {
        throw error;
      }
    }
  }
}

// The Locked Box:

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true; },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(fn){
  try {
    box.unlock();
    fn();
  } finally {
    if (!box.locked) {
      box.lock();
    }
  }
}
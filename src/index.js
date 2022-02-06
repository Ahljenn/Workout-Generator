//https://wger.de/en/software/api

const ppl_split = ["Push", "Pull", "Legs"];
const reps = ["Low weight: 15-20 reps", "Medium weight: 10-14 reps", "Heavy weight: 4-8 reps"];
//0 - Any reps
//1 - Low or medium 
//2 - None
//3 - Burnout, only one of these should exist in set
const chest = {
  "Flat dumbell benchpress" : 0, 
  "Flat barbell benchpress" : 0, 
  "Flat dumbbell fly" : 0,
  "Incline dumbell benchpress" : 0, 
  "Incline barbell benchpress" : 0, 
  "Incline dumbbell fly" : 0, 
  "Decline dumbell benchpress" : 0, 
  "Decline barbell benchpress" : 0, 

  "Cable fly" : 1,
  "Plate press" : 1,
  "Cable cross-over" : 1,
  "Machine chest press" : 1, 
  "Machine chest fly" : 1,
  "Seated peckdeck fly" : 1,

  "Dips" : 2,
  "Body-weight push-up (Any variation)" : 2,
  "Decline Body-weight push-up" : 2,
  "Seated tricep extension" : 2,

  "Burnout dips" : 3,
  "Burnout pushups" : 3
};

const legs = {
  "Front squat" : 0, 
  "Barbell back squat" : 0,
  "Deadlift" : 0, 
  "Leg press" : 0, 
  "Power clean" : 0, 
  "Hang clean" : 0, 

  "Barbell lunge" : 1, 
  "Hamstring machine" : 1, 
  "Quad machine" : 1, 
  "Single-leg romanian deadlift" : 1, 
  "Kettlebell Swing" : 1
};

const back = {
  "Superman row" : 0, 
  "T-bar row" : 0, 
  "Deadlift" : 0, 
  "Barbell row" : 0, 

  "Single-arm dumbell row" : 1, 
  "Stiff arm pulldown" : 1, 
  "Wide-grip lat pulldown" : 1, 
  "Close-grip lat pulldown" : 1, 
  "Seated cable row" : 1, 
  "Standing cable L-pulls" : 1, 
  "Seated bicep curls" : 1, 
  "Hammer curls" : 1, 
  "Cable curls" : 1
};

//Ab work out logic is different
const abs = {
  "Track holds" : 4,
  "Flutter kicks" : 4,
  "Leg raise" : 4,
  "Flutter kicks" : 4,
  "In-n-outs" : 4,
  "Russian twist" : 4,
  "Star crunches" : 4,
  "Bicycles" : 4,
  "Mountain climbers" : 4,
  "Crunches" : 4,
  "Reach-ups" : 4,
  "Side planks" : 4,
  "Planks" : 4
};

const options = [chest, legs, back, abs];

function reset(){
  /**
   * Reset inner html in main
   */
  document.getElementById("workouts").innerHTML = '';
}

function showWorkout(workout){
  /**
   * Display workout
   */
  document.getElementById("workouts").innerHTML = "<hr/>"; //Needed to reset the field after reclicking
  for(let wk of workout){
    document.getElementById("workouts").innerHTML += (wk[0] + " - " + '<i>' + wk[1] + '</i>' + '<br><br>');
  }
}

function getRandomWorkout(day){
  /**
   * Generate a workout and return its key given the day
   * todo: Generate only one burnout
   */
  var workoutKeys = Object.keys(day);
  var randWorkout = Math.floor(Math.random() * workoutKeys.length);
  workoutKey = workoutKeys[randWorkout];
  return workoutKey;
}

function randomRange(a, b){
  /**
   * Generate and return a number in specified range 
   */
  return Math.floor(Math.random() * (b - a + 1)) + a;
}


function generate(day){
  /**
   * Generate workout and returns a mathematical set with no duplicates
   * Range of workouts 5 - 8
   */

  const minWorkouts = 5;
  const maxWorkotus = 8;
  const numberWorkouts = randomRange(minWorkouts, maxWorkotus);

  workouts = new Map();
  while(workouts.size < numberWorkouts){
    gw = getRandomWorkout(day);
    switch(day[gw]){
      case 0:
        workouts.set(gw, reps[randomRange(0, reps.length - 1)] + " x " + randomRange(1,5) + " sets");
        break;
      case 1:
        workouts.set(gw, reps[randomRange(0, reps.length - 2)] + " x " + randomRange(1,5) + " sets");
        console.log(workouts.size);
        break;
      case 2:
        workouts.set(gw, "20-25 Reps" + " x " + randomRange(1,5) + " sets");
        break;
      case 3:
        workouts.set(gw, "Burnout");
        break;
      case 4: //Logic for abs
        workouts.set(gw, "45 - 60 seconds");
        break;
    }
  }
  return workouts;
}

showWorkout(generate(chest));

// main run functions
$(document).ready(function(){
  animateDiv();
  decrement_timer();
});

// function to increment the score when the balloon is clicked
var score_count = 0;
function increment_score(){
  score_count++;
  document.getElementById('score').innerHTML = score_count;
}

// function to decrement the timer and end the game
var timer = 20;
function decrement_timer(){
  timer--;
  document.getElementById('timer').innerHTML = timer;
  // if timer hasn't hit 0 then decrease the timer after 1 second
  if(timer != 0) setTimeout(decrement_timer, 1000);
  else {
    //function to end the game
    end_game();
  }
}

// function to run when the game is over
function end_game(){
  alert('You scored ' + score_count);
  reset();
}

// reset function
function reset(){
  score_count = 0;
  timer = 20;
  decrement_timer();
  document.getElementById('score').innerHTML = score_count;
}

// make a new position for the balloon to go to
function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}

// animate the balloons movement 
function animateDiv(){
    var newq = makeNewPosition();
    $('.balloons').animate({ top: newq[0], left: newq[1] }, 2000, function(){
      console.log('baloon moving');
      animateDiv();
    });

};

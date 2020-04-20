var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


function nextSequence() {
  return Math.floor(Math.random() * 4);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function buttonAnimation(name) {
  playSound(name);
  $("." + name).fadeOut(150).fadeIn(150); //Flash
  $("." + name).addClass("pressed");
  setTimeout(() => {
    $("." + name).removeClass("pressed");
  }, 100);

}

function pushNumberGamePattern() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomChosenColor = buttonColors[nextSequence()];
  gamePattern.push(randomChosenColor);
  buttonAnimation(randomChosenColor);

}

function checkPattern(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        pushNumberGamePattern();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("h1").text("Game Over! Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

$(".btn").click(function (e) {
  var colorName = this.id;
  userClickedPattern.push(colorName);
  buttonAnimation(colorName);
  checkPattern(userClickedPattern.length - 1);

});


$("h1").text("Press a key to start");
$(document).keypress(function () {
  if (!started) {
    started = true;
    $("h1").text("Level " + level);
    pushNumberGamePattern();
  }
})

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//random no
//push and display
//keypress, push, check, display
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

//key press start game
$(document).keydown(() => {
  if (!start) {
    start = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

//user choice
$(".btn").on("click", function (e) {
  userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//random choice
function nextSequence() {
  level += 1;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .hide()
    .fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

//play sound
function playSound(choice) {
  var sound = new Audio("sounds/" + choice + ".mp3");
  sound.play();
}

//animation on press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

//Checking pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Restart
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = false;
}

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).ready(function($) {


  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    //flash button
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);

  }

  // buttons pressed by the user
  $(".btn").on("click", function(event) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
  });

  // checking if the patterns are the same
  function checkAnswer(currentLevel) {
    let i = currentLevel - 1;
    if (gamePattern[i] === userClickedPattern[i]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(
          function() {
            nextSequence();
          }, 1000);
      }
    } else {
      $("#level-title").html("GAME OVER! Press any key to restart.");
      $("body").addClass("game-over");
      setTimeout(
        function () {
          $("body").removeClass("game-over");
        }, 200);
      let gameOver = new Audio("sounds/wrong.mp3");
      gameOver.play();
      startOver();
    }
  }


  // playing button sounds
  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3"); /* NON FUNZIONA PER IL PULSANTE CHE FLASHA*/
    audio.play();
  }

  // animating buttons pressed
  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);

  }

  // calling nextSequence on the first keypress
  $(document).on("keydown", function() {

    if (started === true) {
      return;
    } else {
      started = true;
      nextSequence();
    }
  })

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }

});

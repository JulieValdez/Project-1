console.log("app file connected");
//============================================================
//GLOBAL VARIABLES
//============================================================
var intervalId;
var clockRunning = false;
var time = 60;

//============================================================
// FUNCTIONS
//============================================================
//on page load, instructions are shown + start button
$(document).ready(function() {
  $("<p>")
    .text("Instructions Placeholder using JS, showing on start screen")
    .appendTo(".top-section");

  //this is where the timer js happens
  function start() {
    console.log("start func working");

    // Use setInterval to start the count here and set the clock to running...for 1 minute
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
      console.log("clock's running");
    }
  }

  function count() {
    // decrement time by 1
    time--;
    console.log("count", time);

    //  Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    var converted = timeConverter(time);
    console.log(converted);

    // Use the variable we just created to show the converted time in the "time-remaining" div.
    $("#timer").text(converted);

    //clear the interval so that time doesn't go negative
    if (time === 0) {
      timeoutOrDone();
    }
  }

  function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }

  //once start button clicked, 1st question shown and timer counting down from 60 seconds, and gif shows
  $("#button").on("click", function() {
    $("p").hide();
    $("#button").text("");
    $("#button").text("Next");
    $("<p>")
      .text("Questions Text Placeholder")
      .appendTo("#jokesCont");
    //start func called
    start();
    //timer counts down from 60 seconds (displayed on screen)
    $("#timer").text("1:00");
  });
  //on last question, button changes to 'Finish'
  function timeoutOrDone() {
    clearInterval(intervalId);
    //if timer runs out or user clicks Finish
    $("#timer").text("0:00");
  }
});
//when game over score shown: x/10, gif shown depending on their 'grade' and button /message that says: do you want to play again?

//============================================================
// MAIN PROCESS
//============================================================

// This is the code from Giphy

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
  // Here we are building the URL we need to query API

  var queryURL =
    "https://opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple";

  // Here we run our AJAX call to the GIPHY API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //log the query URL
    console.log(queryURL);
    // we store all of the retreived data inside an object called "response"
    console.log(response);
    console.log(response.results[0].question);
    var results = response.results;
    console.log(results);

    for (let i = 0; i < results.length; i++) {
      //   const indivResult = results[i];
      //   console.log(indivResult);
      //loop through and pull out each q / create a var
      const question = results[i].question;
      console.log(question);
      //Louis TherouxErrol Morris,Joe Berlinger,Adam Curtis
      //also a var for answers (both correct + incorrect) this worked but it's not a pretty string
      // const answers = results[i].correct_answer + results[i].incorrect_answers;
      // console.log(answers);
      const correctAns = results[i].correct_answer;
      const incorrectAns = results[i].incorrect_answers;
      console.log(correctAns);
      console.log(incorrectAns);

      //may need to display using a random func

      //one var for incorrect and one for correct and display
      //if else statement to check against it
    }
  });

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

// This is the code from Giphy2


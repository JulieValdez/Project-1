//============================================================
//GLOBAL VARIABLES
//============================================================
var intervalId;
var clockRunning = false;
var time = 120;
var questions;
var questionNumber = 0;

//============================================================
// FUNCTIONS
//============================================================
//on page load, instructions are shown + start button
$(document).ready(function() {
  $("#questionCont").hide();
  $("#gifCont").hide();
  // Here we are building the URL we need to query API
  $(document).on("click", ".answerBtn", function(e) {
    clickedButton(e);
  });

  var queryURL =
    "https://opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple";
  function renderQuestion() {
    console.log(questions);
    var questionDiv = $("<div>").html(questions[questionNumber].question);

    $("#questionCont").append(questionDiv);
  }

  function renderAnswers() {
    const correctAns = questions[questionNumber].correct_answer;
    const answers = questions[questionNumber].incorrect_answers;
    answers.push(correctAns);
    console.log(correctAns);
    console.log(answers);
    for (let i = 0; i < answers.length; i++) {
      var answerBtn = answers[i];
      console.log(answerBtn);
      answerBtn = $("<button>");
      answerBtn.addClass("answerBtn");
      answerBtn.attr("data-name", answers[i]);
      answerBtn.html(answers[i]);
      $("#questionCont").append(answerBtn);
    }
  }

  // Here we run our AJAX call to the trivia API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    questions = response.results;

    //will need a click listener on each answer...when click on answ and will have to compare

    //if else statement to check against it?
  });

  function nextQuestion() {
    $("#questionCont").empty();
    $("#gifCont").empty();
    questionNumber++;
    renderQuestion();
    renderAnswers();
    displayGifs();
  }

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

  $("#start-button").on("click", function() {
    $("#start-button").hide();
    $("#instructions").hide();
    $("#questionCont").show();
    $("#gifCont").show();
    displayGifs();
    renderQuestion();
    renderAnswers();
    //start func called
    start();
    //timer counts down from 120 seconds (displayed on screen)
    $("#timer").text("2:00");
  });

  function clickedButton(e) {
    event.preventDefault();
    console.log("button clicked");

    nextQuestion();
  }
  //on last question, button changes to 'Finish'
  function timeoutOrDone() {
    clearInterval(intervalId);
    //if timer runs out or user clicks Finish
    $("#timer").text("0:00");
  }

  //when game over score shown: x/10, gif shown depending on their 'grade' and button /message that says: do you want to play again?

  // This is the code from Giphy2

  function displayGifs() {
    var queryURL =
      "https://api.giphy.com/v1/gifs/random?tag=bored&rating=PG&api_key=pAxeLmVndZQ5FT6mm6fQieZRFPAFaSJi";


    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      // Retrieving the URL for the image
      var imgURL = response.data.images.fixed_height.url;
      var image = $("<img>").attr("src", imgURL);
      $("#gifCont").append(image);
    });
    $(document).on("click", "#button", displayGifs);
  }
});

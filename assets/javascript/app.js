//============================================================
//GLOBAL VARIABLES
//============================================================
var intervalId;
var clockRunning = false;
var time = 120;
var questions;
var questionNumber = 0;
var correct = 0;
var incorrect = 0;
var correctAns;
var answers;

//============================================================
// FUNCTIONS
//============================================================
//on page load, instructions are shown + start button
$(document).ready(function() {
  $(".gameContent").hide();

  $(document).on("click", ".answerBtn", function(e) {
    clickedButton(e);
  });

  $(document).on("click", ".playAgain", function(e) {
    window.location.reload();
  });

  var queryURL =
    "https://opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple";
  function renderQuestion() {
    console.log(questionNumber); // 19
    console.log(questions.length); // 20
    var questionDiv = $("<div>").html(questions[questionNumber].question);

    $("#questionCont").append(questionDiv);
  }

  function renderAnswers() {
    correctAns = questions[questionNumber].correct_answer;

    answers = questions[questionNumber].incorrect_answers;
    answers.push(correctAns);

    answers.sort(function() {
      return 0.5 - Math.random();
    });

    for (let i = 0; i < answers.length; i++) {
      var answerBtn = answers[i];

      answerBtn = $("<button>");
      answerBtn.addClass("answerBtn btn-block hvr-pulse-shrink");
      answerBtn.attr("data-name", answers[i]);
      answerBtn.html(answers[i]);
      $("#answerCont").append(answerBtn);
    }
  }

  // Here we run our AJAX call to the trivia API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    questions = response.results;
  });

  function nextQuestion() {
    $("#questionCont").empty();
    $("#answerCont").empty();
    $("#gifCont").empty();
    questionNumber++;

    if (questionNumber === questions.length) {
      timeoutOrDone();
    } else {
      renderQuestion();
      renderAnswers();
      displayGifs();
    }
  }

  //this is where the timer js happens
  function start() {
    // Use setInterval to start the count here and set the clock to running...for 1 minute
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
  }

  function count() {
    // decrement time by 1
    time--;

    //  Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    var converted = timeConverter(time);

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
    $(".starter").hide();
    $(".gameContent").show();
    displayGifs();
    renderQuestion();
    renderAnswers();
    //start func called
    start();
    //timer counts down from 120 seconds (displayed on screen)
    $("#timer").text("2:00");
  });

  function clickedButton(e) {
    e.preventDefault();

    if (e.target.getAttribute("data-name") === correctAns) {
      correct++;
    } else {
      incorrect++;
    }
    nextQuestion();
  }
  //on last question, button changes to 'Finish'
  function timeoutOrDone() {
    console.log("timeoutordoneworking");

    clearInterval(intervalId);
    //if timer runs out or...if question Num is less than or equal to questions.length
    $("#timer").text("0:00");
    var correctDisplay = $("<p class='finalDisplay'>").text(
      "correct: " + correct
    );
    var incorrectDisplay = $("<p class='finalDisplay'>").text(
      "incorrect: " + incorrect
    );
    $("#questionCont").append(correctDisplay);
    $("#questionCont").append(incorrectDisplay);

    playAgainButton = $("<button>");
    playAgainButton.addClass("playAgain btn-block hvr-pulse-shrink");

    playAgainButton.text("Play Again");
    $("#questionCont").append(playAgainButton);
  }

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
      var image = $("<img>")
        .attr("src", imgURL)
        .addClass("img-fluid img-thumbnail mx-auto d-block hvr-pulse-shrink");
      $("#gifCont").append(image);
    });
    console.log("gifs displayed");
  }

  // function resetGame() {
  //   clockRunning = false;
  //   time = 120;
  //   questionNumber = 0;
  //   correct = 0;
  //   incorrect = 0;

  //   correctAns;
  //   displayGifs();
  //   renderQuestion();
  //   renderAnswers();
  //   start();
  //   $("#timer").text("2:00");
  //   $(".finalDisplay").hide();
  //   $(".playAgain").hide();
  // }
});

;(function () {
  'use strict';

  // Page elements
  var tweetInput = $('#tweetInput'),
      tweetForm = $('#addTweet'),
      url = 'http://tiy-515.herokuapp.com/collections/tvpham11',
      tweetsHolder = $('#tweets');


  // Tweet constructor (Blueprint)
  var Tweet = function (message) {
    this.message = message;
    this.timestamp = Date.now();
  };

  // Add tweet function
  var addTweet = function (e) {

    e.preventDefault();  // Prevent default handler

    var message = tweetInput.val();

    // Create Tweet instance
    var tweet = new Tweet(message);

    // Save message to database
    $.post(url, tweet).done(displayTweet);

    // Clear form
    this.reset();

  };

  // Displaying Tweet
  var displayTweet = function (data) {
    var tweetMessage = "<div class='tweet' id='" + data._id + "'>";
        tweetMessage += data.message;
        tweetMessage += "<span>X</span>";
        tweetMessage += "</div>";

    tweetsHolder.prepend(tweetMessage);
  };

  // Get all tweets
  var getTweets = function() {

    // Get tweets from server
      $.getJSON(url).done(function (data) {

        var reserveData = data.reverse();

      // Display them on page
      data.forEach( function(t) {

        displayTweet(t);

      });

    });

  };

  // Delete our tweet
  var deleteTweet = function(e) {
    e.preventDefault();

    var tweet2Del = $(this).parent(),
        id2Del = tweet2Del.attr('id');

    $.ajax({
      url: url + '/' + id2Del,
      type: 'DELETE',
    }).done(function () {
      tweet2Del.fadeOut();
    });

  };

  // Submit handler
  tweetForm.on('submit', addTweet);

  // Delete handler
  tweetsHolder.on('click', 'span', deleteTweet);

  // Start our app
  getTweets();

})();

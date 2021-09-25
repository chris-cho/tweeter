$(document).ready(function() {
  const renderTweets = function(tweets) {
    //reversing objectkeys arr to get the most recent tweet
    Object.keys(tweets).reverse().forEach(tweet => {
      $("main").append(createTweetElement(tweets[tweet]));
    });
  };

  const createTweetElement = function(data) {
    let tweet = $(`
    <article id="tweets-container">
      <header>
        <label id="name"><i class=${data.user.avatars}></i>${data.user.name}</label>
        <label id="tag">${data.user.handle}</label>
      </header>
      <label id="tweet-text">${data.content.text}</label>
      <div id="black-bar"></div>
      <footer>
        <label id="days">${timeago.format(data.created_at)}</label>
        <div id="footer-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);
    return tweet;
  };

  const validateTweet = (text) => {
    if (text.length <= 5) { //'text='.length = 5
      alert("Please enter something");
    } else if (text.length > 145) { //'text=' + 140 chars
      alert("You wrote too much");
    } else {
      $.ajax(`/tweets`, {method: 'POST', data: text}).then(() => {
        $('article').remove();
        loadTweets();
      });
    }
  };

  $(".new-tweet").submit(function (event) {
    event.preventDefault();
    validateTweet($('form').serialize());
  });

  const loadTweets = () => {
    $.ajax('/tweets', {method: 'GET'}). then(function (tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();
});

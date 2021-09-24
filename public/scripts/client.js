$(document).ready(function() {
  const userData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is bystanding on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    Object.keys(tweets).forEach(tweet => {
      console.log(tweet);
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
  renderTweets(userData);
});
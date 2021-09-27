$(document).ready(function() {
  const renderTweets = function(tweets) {
    //reversing objectkeys arr to get the most recent tweet
    Object.keys(tweets).reverse().forEach(tweet => {
      $("main").append(createTweetElement(tweets[tweet]));
    });
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderError = (error) => {
    $('.error').remove();
    $('main').prepend(error);
    $('.error').hide().slideDown(1000);
  };

  const createErrorElement = (errorType) => {
    if (errorType === 'long') {
      return renderError($(`<label class="error" id="too-long"><i class="fas fa-exclamation-triangle"></i>Too long. how bout a 6 inch sub?<i class="fas fa-exclamation-triangle"></i></label>`));
    } else if (errorType === 'short') {
      return renderError($(`<label class="error" id="too-short"><i class="fas fa-exclamation-triangle"></i>Too short. that's what she said.<i class="fas fa-exclamation-triangle"></i></label>`));
    }
  };


  const createTweetElement = function(data) {
    let tweet = $(`
    <article id="tweets-container">
      <header>
        <label id="name"><img class="avatar" src=${data.user.avatars}></img>${data.user.name}</label>
        <label id="tag">${data.user.handle}</label>
      </header>
      <label id="tweet-text">${escape(data.content.text)}</label>
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
      createErrorElement('short');
    } else if (text.length > 145) { //'text=' + 140 chars
      createErrorElement('long');
    } else {
      $('.error').remove();
      const body = {
        text: text.split("=")[1],
        user: {
          name: 'Chris',
          handle: '@chris',
          avatars: "https://i.imgur.com/73hZDYK.png"
        }
      };
      $.ajax(`/tweets`, {method: 'POST', data: body}).then(() => {
        $('article').remove();
        $('form')[0].reset();
        loadTweets();
      });
    }
  };

  $(".new-tweet").submit(function(event) {
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

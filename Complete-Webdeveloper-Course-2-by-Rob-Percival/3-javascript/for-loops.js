var tweets = ["Hi Everyone!", "I love cornflakes!", "Night night :)"];

var tweetString = "";

for (var i = 0; i < tweets.length; i++) {
    tweetString = tweetString + "<p>" + tweets[i] + "</p>";
}

document.getElementById("tweetDiv").innerHTML = tweetString;

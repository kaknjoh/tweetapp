import React, { useEffect, useState } from "react";
import { apiTweetList } from "./lookup";
import { Tweet } from "./detail";
export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [tweetsDidSet, setTweetsDidSet] = useState(false);
  console.log(props.newTweets);

  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [tweetsInit, tweets, props.newTweets]);
  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setTweetsInit(response);
          setTweetsDidSet(true);
        } else {
          alert("There was an error");
        }
      };
      apiTweetList(props.username, handleTweetListLookup);
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit];
    updateTweetsInit.unshift(newTweet);
    setTweetsInit(updateTweetsInit);
    const updateFinalTweets = [...tweets];
    updateFinalTweets.unshift(tweets);
    setTweets(updateFinalTweets);
  };
  return tweets.map((tweet, index) => {
    return (
      <Tweet
        tweet={tweet}
        didRetweet={handleDidRetweet}
        className="my-5 py-5 border bg-white text-dark"
        key={tweet.id}
      />
    );
  });
}

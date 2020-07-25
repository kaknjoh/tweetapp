import React, { useState, useEffect } from "react";
import { TweetsList } from "./list";
import { TweetCreate } from "./create";
import { apiTweetDetail, apiTweetList } from "./lookup";
import { Tweet } from "./detail";

export function TweetsComponent(props) {
  const [newTweets, setNewTweets] = useState([]);

  const canTweet = props.canTweet === "false" ? false : true;
  const handleNewTweet = (newTweet) => {
    let tempNewTweet = [...newTweets];
    tempNewTweet.unshift(newTweet);
    setNewTweets(tempNewTweet);
    // backend api response handler
  };

  return (
    <div className={props.className}>
      {canTweet === true && (
        <TweetCreate didTweet={handleNewTweet} className="col-12 mb-3" />
      )}
      {<TweetsList newTweets={newTweets} {...props} />}
    </div>
  );
}

export function TweetDetailComponent(props) {
  const { tweetId } = props;
  const [didLookup, setDidLookup] = useState(false);
  const [tweet, setTweet] = useState(null);
  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setTweet(response);
    } else {
      alert("There was an error");
    }
  };
  useEffect(() => {
    if (didLookup === false) {
      apiTweetDetail(tweetId, handleBackendLookup);
      setDidLookup(true);
    }
  }, [tweetId, didLookup, setDidLookup]);

  return tweet === null ? null : (
    <Tweet tweet={tweet} className={props.className} />
  );
}

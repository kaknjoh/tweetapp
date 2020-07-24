import React, { useEffect, useState } from "react";
import { loadTweets } from "../lookup";

export function TweetsComponent(props) {
  const textAreaRef = React.createRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(textAreaRef.current.value);
    const newValue = textAreaRef.current.value;
    console.log(newValue);
    textAreaRef.current.value = "";
  };
  return (
    <div className={props.className}>
      <div className="col-12 mb-3">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textAreaRef}
            required={true}
            className="form-control"
          ></textarea>
          <button type="submit" className="btn btn-primary my-3">
            Tweet
          </button>
        </form>
      </div>
      {<TweetsList />}
    </div>
  );
}
export function ActionBtn(props) {
  const { tweet, action } = props;
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  const [userLike, setUserLike] = useState(
    tweet.userLike === true ? true : false
  );
  const className = props.className ? props.className : "btn btn-primary";
  const actionDisplay = action.display ? action.display : "Action";

  const display =
    action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;
  const handleClick = (e) => {
    e.preventDefault();
    if (action.type === "like") {
      if (userLike === true) {
        setLikes(likes - 1);
        setUserLike(false);
      } else {
        setLikes(likes + 1);
        setUserLike(true);
      }
    }
  };
  return (
    <button onClick={handleClick} className={className}>
      {display}
    </button>
  );
}

export function Tweet(props) {
  const { tweet } = props;
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6";

  return (
    <div className={className}>
      <p>
        {tweet.id}-{tweet.content}
      </p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
        <ActionBtn
          tweet={tweet}
          action={{ type: "unlike", display: "Unlike" }}
        />
        <ActionBtn
          tweet={tweet}
          action={{ type: "retweet", display: "Retweet" }}
        />
      </div>
    </div>
  );
}

export function TweetsList(props) {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const myCallBack = (response, status) => {
      if (status === 200) {
        setTweets(response);
      } else {
        alert("There was an error");
      }
    };
    console.log("Doslo");
    loadTweets(myCallBack);
  }, []);
  return tweets.map((tweet, index) => {
    return (
      <Tweet
        tweet={tweet}
        className="my-5 py-5 border bg-white text-dark"
        key={tweet.id}
      />
    );
  });
}

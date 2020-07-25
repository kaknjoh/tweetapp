import React from "react";
import { apiTweetAction } from "./lookup";

export function ActionBtn(props) {
  const { tweet, action, didPerformAction } = props;
  const likes = tweet.likes ? tweet.likes : 0;
  //const [userLike, setUserLike] = useState(
  // tweet.userLike === true ? true : false
  //);

  const className = props.className ? props.className : "btn btn-primary";
  const actionDisplay = action.display ? action.display : "Action";

  const handleActionBackendEvent = (response, status) => {
    console.log(response, status);
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };
  const display =
    action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;
  const handleClick = (e) => {
    e.preventDefault();
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent);
  };
  return (
    <button onClick={handleClick} className={className}>
      {display}
    </button>
  );
}

import { backendLookup } from "../lookup";

export function apiTweetCreate(newTweet, callback) {
  backendLookup("POST", "/tweets/create/", callback, { content: newTweet });
}

export function apiTweetAction(tweetID, action, callback) {
  const data = {
    id: tweetID,
    action: action,
  };
  backendLookup("POST", "/tweets/action/", callback, data);
}

export function apiTweetDetail(tweetID, callback) {
  backendLookup("GET", `/tweets/${tweetID}`, callback);
}

export function apiTweetList(username, callback) {
  let endpoint = "/tweets/";
  if (username) {
    endpoint = `/tweets/?username=${username}`;
  }
  backendLookup("GET", endpoint, callback);
}

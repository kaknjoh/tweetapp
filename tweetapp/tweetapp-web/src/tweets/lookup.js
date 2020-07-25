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
export function apiTweetList(callback) {
  backendLookup("GET", "/tweets/", callback);
}

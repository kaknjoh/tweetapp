export const loadTweets = (callback) => {
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://localhost:8000/api/tweets/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = () => {
    console.log(xhr.response, xhr.status);
    callback(xhr.response, xhr.status);
  };

  xhr.send();
};

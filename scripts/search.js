var location = window.location.href;
var url = new URL(location);

var searchQuery = url.searchParams.get("q");

var postsLink = new URL("../blog/posts.json", document.baseURI).href;

var requestLink = `https://hssc-search-system.glitch.me/?q=${searchQuery}&postLink=${postsLink}`;

function failedConnect(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.text();
}

fetch(requestLink, {
        mode: 'cors'
    }) //the url is http://localhost:80/?<random number="">. The random number is to adoid web caching so the value is constantly updated - important for older browsers
    .then(failedConnect)
    .then(function (response) {

        

    }).catch(function (error) {

    });
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

var template = document.getElementById("post-template");
template.removeAttribute("id");

fetch(requestLink, {
        mode: 'cors'
    })
    .then(failedConnect)
    .then(function (response) {

        var json = JSON.parse(response);
        for (var post in json) {
            
        }

    }).catch(function (error) {

    });
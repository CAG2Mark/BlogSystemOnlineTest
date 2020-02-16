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

            var newItem = template.cloneNode(true);
            setVal(newItem, "post-template-title", post.Title);
            setVal(newItem, "post-template-author", post.Author);
            setVal(newItem, "post-template-date", post.PublishTimeStr);
            setVal(newItem, "post-template-preview", post.Preview);
            setImg(newItem, "post-header-image-mobile", post.HeaderImageName, post.IsHeaderImageSet);
            setImg(newItem, "post-header-image-desktop", post.HeaderImageName, post.IsHeaderImageSet);
        }

        document.getElementById("search-results-container").appendChild(newItem);

    }).catch(function (error) {

    });

function setVal(item, id, val) {
    var obj = item.getElementById(id);
    obj.innerHTML = val;
    obj.removeAttribute("id");
}

function setImg(item, id, val, hasImage) {

    var obj = item.getElementById(id);

    if (hasImage) {
        obj.setAttribute("src", `./content/images/${val}`);
    }
    else {
        obj.classList.add("hidden");
    }
}
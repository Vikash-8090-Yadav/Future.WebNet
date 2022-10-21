const image = document.querySelector("img");

fetch("https://meme-api.herokuapp.com/gimme", {method: "GET"})
    .then(c => c.json())
    .then(data => {
        image.src = data.url
        image.alt = data.title
    })

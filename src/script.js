if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then((registration) => {
        console.log("SW Registered!");
        console.log(registration);
    }).catch((error) => {
        console.log("SW Registration Failed!");
        console.log(error);
    });
}

let reds;
let redList = document.querySelector('.red-list');
let url = 'https://api.portalmec.c3sl.ufpr.br/v1/learning_objects';

window.addEventListener("DOMContentLoaded", fetchAll);

function fetchAll() {
    fetch(url)
    .then(res => {
        return res.json();
    })
    .then(data => {
        reds = data;
        data.map(item => display(item));
    });
}

function display(item) {
    let red = document.createElement("article");
    red.classList.add('red-item', 'container-flex');
    let categories = item.subjects;
    let strCategories = '';
    categories.map(category => strCategories += category.name + ' ');
    red.innerHTML = 
    `<div class="red-item-sec">
        <img src="${'https://api.portalmec.c3sl.ufpr.br/' + item.thumbnail}" alt="${item.name}" class="red-cover">
    </div>
    <div class="red-item-main">
        <h3 class="red-title">${item.name}</h3>
        <p class="red-description">${item.description}</p>
        <p class="red-author"><span class="bold">Criado por:</span> ${item.author}</p>
        <p class="red-category"><span class="bold">Categoria(s): </span>${strCategories}</p>
        <a href="${item.link || item.default_attachment_location}" class="red-url">Acesse aqui</a>
        <ul class="red-tag-list">
        ${createTagList(item.tags)}
        </ul>
        <button class="red-details-btn" onclick="">ver detalhes</button>
    </div>`;
    redList.appendChild(red);
}

function createTagList(tags) {
    let tagList = [];
    tags.map(tag => {
        let tagListItem = `<li class="red-tag">${tag.name}</li>`;
        tagList.push(tagListItem);
    });
    return tagList.join("");
}
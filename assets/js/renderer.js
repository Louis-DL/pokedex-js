import {allTypes} from "./utils.js";

function renderTypeList(){
    const $select = document.querySelector("select");
    let innerHTML = "";
    allTypes().forEach(type => {
        innerHTML += `<option value="${type}">${type}</option>`;
    });
    $select.innerHTML = innerHTML;
}

function renderArticles(pokemons){
    const $main = document.querySelector("main");
    const $template = document.querySelector("main template");

    $main.querySelectorAll("article").forEach(article => article.remove());

    pokemons.forEach(pokemon => {
        const $clone = document.importNode($template.content, true);
        const $image = $clone.querySelector("img");

        $clone.querySelector("h2").textContent = pokemon.name.english;
        $image.src = pokemon.image.hires;
        $image.alt = pokemon.name.english;
        $image.title = pokemon.name.english;

        $main.appendChild($clone);
    });
}

export {
    renderArticles,
    renderTypeList
};
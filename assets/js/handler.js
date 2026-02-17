import {
    allPokemonOfType,
    alreadyExists,
    getCaughtPokemon,
    getSelectedType,
    removePokemonByObject,
    saveCaughtPokemon
} from "./utils.js";
import {renderArticles} from "./renderer.js";

function indexHookup(){
    document.querySelector("select").addEventListener("change", () => {
        renderArticles(allPokemonOfType(getSelectedType()));
    });
    document.querySelector("main").addEventListener("click", catchPokemon);
}


function caughtHookup(){
    document.querySelector("main").addEventListener("click", releasePokemon);
}

function catchPokemon(e){
    const button = e.target.closest("button");
    if (!button) return;
    e.preventDefault();

    const $article = button.closest("article");
    const name = $article.querySelector("h2").textContent;
    const imgUrl = $article.querySelector("img").src;
    const pokemonObject = {
        "name": {"english": name},
        "image": {"hires": imgUrl}
    };

    const caught = getCaughtPokemon();
    if (!alreadyExists(pokemonObject, caught)) {
        caught.push(pokemonObject);
        saveCaughtPokemon(caught);
    }
}

function releasePokemon(e){
    const button = e.target.closest("button");
    if (!button) return;
    e.preventDefault();

    const caughtPokemon = getCaughtPokemon();
    const name = button.closest("article").querySelector("h2").textContent;
    const imgURL = button.closest("article").querySelector("img").src;
    const pokemonObject = {
        "name": {
            "english": name
        },
        "image": {
            "hires": imgURL
        }
    };
    saveCaughtPokemon(removePokemonByObject(pokemonObject, caughtPokemon));
    renderArticles(getCaughtPokemon());
}

export {
    indexHookup,
    caughtHookup
};
import { allPokemon } from "./data/data.js";

function alreadyExists(pokemonObject, arrayOfObjects){
    return arrayOfObjects.map(everyObject => everyObject.name.english).includes(pokemonObject.name.english);

}

function getSelectedType(){
    return document.querySelector("select").value;
}

function allPokemonOfType(type){
    const output = [];
    allPokemon.filter(pokemon => pokemon.type.includes(type)).map(pokemon => output.push({"name": {"english": pokemon.name.english}, "image": {"hires": pokemon.image.hires}}));
    return output;
}

function allTypes(){
    return allPokemon
      .map(pokemon => pokemon.type[0])
      .filter((type, index) => allPokemon
        .map(pokemon => pokemon.type[0])
        .indexOf(type) === index);
}

function getCaughtPokemon(){
    return JSON.parse(localStorage.getItem("caughtPokemon") || "[]");
}

function saveCaughtPokemon(pokemonObject){
    localStorage.setItem("caughtPokemon", JSON.stringify(pokemonObject));
}

function removePokemonByObject(pokemonObject, arrayOfObjects){
    if (alreadyExists(pokemonObject, arrayOfObjects)){
        return arrayOfObjects.filter(object => object.name.english !== pokemonObject.name.english);
    } return arrayOfObjects;
}

export {
    getCaughtPokemon,
    getSelectedType,
    allPokemonOfType,
    alreadyExists,
    saveCaughtPokemon,
    allTypes,
    removePokemonByObject
};
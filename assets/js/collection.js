import {getCaughtPokemon} from "./utils.js";
import {renderArticles} from "./renderer.js";
import {caughtHookup} from "./handler.js";




init();

function init(){
    renderArticles(getCaughtPokemon());
    caughtHookup();
}


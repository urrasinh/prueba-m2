// captura informacion mediante fecht

const pokemonContainer = document.querySelector(".pokemon-container");
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(data => console.log(data))
}

// ciclo para iterar 
function fetchPokemons(numero){
    for(let i = 1; i <= numero; i++){
        fetchPokemon(i)
    }
}

function crearPokemon(pokemon)
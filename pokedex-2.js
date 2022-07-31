
let id=1;

let offset = 0;
const baseUrl =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`

const urlApiImagenes =`https://pokeapi.co/api/v2/pokemon/`
const flipCard$$ = document.createElement("div");


const divGalleryPokemons$$ = document.querySelector(".pokemons-container");

const pokedexContainer$$ = document.querySelector(".pokedex-container");
const btnCargarMas$$ = document.querySelector(".boton-cargar-mas__item");
const btnCargarMenos$$ = document.querySelector(".boton-cargar-menos__item");

const input$$ = document.querySelector("#pokemon");

const imgBtnSearch$$ = document.querySelector(".imgBtnSearch");
flipCard$$.classList.add("flip-card");

pokedexContainer$$.appendChild(divGalleryPokemons$$);

function llamadaApi (){
    fetch(baseUrl)
    .then((response) => response.json())
    .then((pokemons) => {
        printCardsPokemon(pokemons.results);
        console.log(pokemons);
    })
}
llamadaApi();

function printCardsPokemon (pokemons){
    for (const pokemon of pokemons) {
        
        llamadaApiImg();
        id++;
    }
}
    
function llamadaApiImg() {

    fetch(urlApiImagenes + id)
    .then((response) => response.json())
    .then ((arrayPokemon) => {
        //console.log(arrayPokemon);
        printOnePokemon(arrayPokemon);
        
    })
}

const colors ={fire: '#FF7F00',
grass: '#99FF66',
electric: '#FFD700',
water: '#B0E2FF',
ground: '#DEB887',
rock: '#CD853F',
poison: '#CC88BB',
bug: '#EAFD71',
dragon: '#AB82FF',
psychic: '#FFB5C5',
flying: '#BAAAFF',
fighting: '#FF6A6A',
fairy:'#FFB0FF',
normal: '#DDCCAA'}

const types = Object.keys(colors);

/*function filterPokemon (pokemons){
    const nombrePokemon = pokemons.results.find(pokemon => {
        pokemon.name.includes(input$$.value.toLowerCase())
        printOnePokemon(nombrePokemon);
    })
      
    }*/

function printOnePokemon (imagenesPokemon){
    const cardContainer$$ = document.createElement("div");
    cardContainer$$.classList.add("card-container");

    const card$$ = document.createElement("div");
    card$$.classList.add("pokemon-block");

    const cardBack$$ = document.createElement("div");
    cardBack$$.classList.add("pokemon-block-back");
    //cardBack$$.textContent ="Prueba back"
    cardBack$$.appendChild(mostrarStats(imagenesPokemon.stats));


    const imgPokemon$$ = document.createElement("img");
    const idPokemon$$ = document.createElement("h4");
    const nombrePokemon$$ = document.createElement("h2");
    const poke_types = imagenesPokemon.types.map(type => type.type.name);
    const type = types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    imgPokemon$$.setAttribute("src", imagenesPokemon.sprites.other.dream_world.front_default);
    idPokemon$$.textContent = `#${imagenesPokemon.id.toString().padStart(3,0)}`;
    nombrePokemon$$.textContent = imagenesPokemon.name;
    
    card$$.appendChild(nombrePokemon$$);
    card$$.appendChild(imgPokemon$$);
    card$$.appendChild(idPokemon$$);
    

    cardContainer$$.appendChild(card$$);
    cardContainer$$.appendChild(cardBack$$);

    flipCard$$.appendChild(cardContainer$$);
    divGalleryPokemons$$.appendChild(flipCard$$);
    card$$.style.backgroundColor = color;
    cardBack$$.style.backgroundColor = color;
}

function otraPagina (){
    offset +=20;
    llamadaApi();
}

/* function paginaMenos(){
        if(offset > 0){
        offset -= 20;
        llamadaApi();
    }
} */

btnCargarMas$$.addEventListener("click", otraPagina);
//btnCargarMenos$$.addEventListener("click", paginaMenos);

/* function teclaEnterBuscador (){
    teclaEnter = event.keyCode;
    if(teclaEnter == 13){
        return searchPokemon();
    }
}
window.onkeydown=teclaEnterBuscador; */

function searchPokemon(){
    //console.log(nombre);
    console.log(input$$.value.toLowerCase())
    flipCard$$.innerHTML ="";
    btnCargarMas$$.remove();

    fetch(`https://pokeapi.co/api/v2/pokemon/${input$$.value}`)
    .then((response) => response.json())
    .then((pokemons) => {
        //filterPokemon(pokemons);
        printOnePokemon(pokemons);

    }
    )
}

imgBtnSearch$$.addEventListener("click", () => searchPokemon())
/* input$$.addEventListener("keydown", function (event){
    teclaEnter = event.keyCode;
    if(teclaEnter===13){
        event.stopPropagation(); 
        searchPokemon();
                  
    }
})   */

function mostrarStats (stats){
    const statsContainer$$ = document.createElement("div");
    statsContainer$$.classList.add("stats-container");
    for (const stat of stats) {

        const statContainer$$ = document.createElement("div");
        statContainer$$.classList.add("stat-container");
        const divStatName$$ = document.createElement("div");
        divStatName$$.classList.add("div-stat-name");
        const statPercent$$ = document.createElement("div");
        statPercent$$.classList.add("progress-bar");
        statPercent$$.classList.add("progress-bar-striped");
        statPercent$$.classList.add("progress-bar-animated");

        const statName$$ = document.createElement("p");
        statName$$.classList.add("stat-name");
        
        const statPercent = stat.base_stat + "%"
        const statName = stat.stat.name
        
        statPercent$$.textContent = statPercent;
        statName$$.textContent = statName;

        const progress$$ = document.createElement("div");
        progress$$.classList.add("progress");
        statPercent$$.setAttribute("aria-valuenow", stat.base_stat);
        statPercent$$.setAttribute("aria-valuemin", 0);
        statPercent$$.setAttribute("aria-valuemax", 230);

        statPercent$$.style.width = statPercent;

        progress$$.appendChild(statPercent$$)
        divStatName$$.appendChild(statName$$)
        statContainer$$.appendChild(divStatName$$);
        statContainer$$.appendChild(progress$$);
        statsContainer$$.appendChild(statContainer$$);
    }
    return statsContainer$$;
}
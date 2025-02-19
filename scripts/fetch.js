let dataList = {};
let allPokemon = [];
let typeUrlList = [];
let offset = 0;

async function fetchData() { 
    let url =  `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    let response = await fetch (url);
    let data = await response.json();
    dataList = data; 
}

async function getPokemon(){
    for (let index = 0; index < dataList.results.length; index++) {
        let pokemonUrl = dataList.results[index].url;
        let response = await fetch(pokemonUrl);
        let singlePokemon = await response.json();
        allPokemon.push(singlePokemon);
    }  
}

async function getTypeIcon() {
    for (let i = 0; i < allPokemon.length; i++){
        let pokemonTypeIcons = [];   
        for (let j = 0; j < allPokemon[i].types.length; j++) {
        const typeUrl = allPokemon[i].types[j].type.url;
        let response = await fetch(typeUrl);
        let types = await response.json();
        let iconUrl = types.sprites["generation-vii"]["lets-go-pikachu-lets-go-eevee"].name_icon;
        pokemonTypeIcons.push(iconUrl);
        }
        allPokemon[i].typeIcons = pokemonTypeIcons;
    }
}

function getTypeName() {
    for (let i = 0; i < allPokemon.length; i++) {
        let pokemonTypeName = [];
    
    for (let j = 0; j < allPokemon[i].types.length; j++) {
        let typeName = allPokemon[i].types[j].type.name;
        pokemonTypeName.push(typeName);
    }
        allPokemon[i].typeNames = pokemonTypeName;
    }
}

function getAbilities() {
    for (let i = 0; i < allPokemon.length; i++) {
        let pokemonAbilities = [];
        for (let j = 0; j < allPokemon[i].abilities.length; j++) {
            let abilities = allPokemon[i].abilities[j].ability.name;
            pokemonAbilities.push(abilities);
        }
        allPokemon[i].abilitiesNames = pokemonAbilities;
    }
}

function getStats() {
    for (let i = 0; i < allPokemon.length; i++) {
            let pokemonStats = [] ;
        for (let j = 0; j < allPokemon[i].stats.length; j++) {
            let stat_value = allPokemon[i].stats[j].base_stat;
            let stat_name = allPokemon[i].stats[j].stat.name;
            pokemonStats.push({name:stat_name,value:stat_value});
        }
        allPokemon[i].pokeStats = pokemonStats;
    }
}
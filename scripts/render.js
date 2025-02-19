function renderPokemon(pokemon) {
    let type_icon = generateTypeIcons(pokemon.typeIcons);
    let bg_color = toggleBackgroundColor(pokemon.typeNames);
    let formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return `
        <div class="card" onclick="showOverlay(${pokemon.id})">
            <div class="card_headline"> <span>#${pokemon.id}</span> <h2>${formattedName}</h2> 
            </div>
        <div class="card_img" style="background-color: ${bg_color};" >
            <img  src="${pokemon.sprites.other.home.front_default}" alt="${formattedName}">
        </div>
        <div class="card_footer">
             ${type_icon}
        </div>
    </div>
    `;
}

function renderPokemonOverlay(pokemon) {
    let type_icon = generateTypeIcons(pokemon.typeIcons);
    let bg_color = toggleBackgroundColor(pokemon.typeNames);
    let formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return `
        <div class="card_overlay">
            <div class="card_overlay_headline">
                <span>#${pokemon.id}</span> 
                <h2>${formattedName}</h2>
            </div>
            <div class="card_overlay_img" style="background-color: ${bg_color};">
                <img src="${pokemon.sprites.other.home.front_default}" alt="${formattedName}">
            </div>
            <div class="card_overlay_type">
                ${type_icon}
            </div>
            <div class="tab_menu">
                <span id="prevBtn" class="arrow-left" onclick="navigatePokemon('prev', ${pokemon.id})">
                    <i class="fas fa-chevron-left"></i>
                </span>
                <span id="mainTab" class="tab active" onclick="displayMain(${pokemon.id})">main</span>
                <span id="statsTab" class="tab" onclick="displayStats(${pokemon.id})">stats</span>
                <span class="arrow-right" onclick="navigatePokemon('next', ${pokemon.id})">
                    <i class="fas fa-chevron-right"></i>
                </span>
            </div>
            <div id="pokemon_info"></div>
        </div>`;
}

function toggleBackgroundColor(typeNames){
    let type = typeNames[0];

    switch (type) { 
        case "grass":
            return "#76CC54"; 
        case "fire":
            return "#EC4225"; 
        case "water":
            return "#4F9BFE"; 
        case "bug":
            return "#ABBA23"; 
        case "poison":
            return "#B15CD9"; 
        case "ice":
            return "#96D9D6"; 
        case "dragon":
            return "#6F35FC"; 
        case "ground":
            return "#D97844"; 
        case "normal":
            return "#A8A77A"; 
        case "electric":
            return "#F4D23C";
        case "fairy":
            return "#D685AD";
        default:
            return "#CCCCCC"; 
    }
}

function generateTypeIcons(typeIcons){
    let type_icon = '' ;
    for (let i = 0; i < typeIcons.length; i++) {
        type_icon += `<img src="${typeIcons[i]}" alt="Pokemon Type Icon">`;
    }
    return type_icon;
}

function renderMainContent(pokemon) {
    let abilities = pokemon.abilitiesNames.join(', ')
    return `
    <table>
        <tr>
            <td class="table_left"><strong>Height:</strong></td>
            <td>${pokemon.height}m</td>
        </tr>
        <tr>
            <td class="table_left"><strong>Weight:</strong></td>
            <td>${pokemon.weight}kg</td>
        </tr>
        <tr>
            <td class="table_left"><strong>Experience:</strong></td>
            <td>${pokemon.base_experience}</td>
        </tr>
        <tr>
            <td class="table_left"><strong>Abilities:</strong></td>
            <td>${abilities}</td>
        </tr>
    </table>
`;
}

function renderStatsContent(pokemon) {
    let stats = '';
    for (let i = 0; i < pokemon.pokeStats.length; i++) {
        stats += generateStatView(pokemon.pokeStats[i]);
    }
    return stats;
}

function generateStatView(stat){
    let barWidth = Math.min(stat.value, 100);

    return` <div class="stat">
            <p>${stat.name}: ${stat.value}</p>
            <div class="stat-bar">
                <div class="stat-bar-fill" style="width: ${barWidth}%;"></div>
            </div>
        </div>`;
}

function renderMorePokemon(){
    let contentSection = document.getElementById('content');
    allPokemon.slice(offset).forEach(pokemon => {
        contentSection.innerHTML += renderPokemon(pokemon);
    });
}
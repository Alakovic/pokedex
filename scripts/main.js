async function displayPokemon() {
    await fetchData();
    await getPokemon();
    await getTypeIcon();
    getTypeName();
    getAbilities();
    getStats();

    let contentSection = document.getElementById('content');
    contentSection.innerHTML = "" ;
    
    allPokemon.forEach(pokemon => {
        contentSection.innerHTML += renderPokemon(pokemon);
    })
}

async function loadMorePokemon() {
    offset += 20;
    showLoadingSpinner();
    await fetchData();
    await getPokemon();
    await getTypeIcon();
    getTypeName();
    getAbilities();
    getStats();
    hideLoadingSpinner();
    renderMorePokemon();
}

async function showOverlay(id) {
    const pokemon = allPokemon.find(pokemon => pokemon.id === id);
    const overlay = document.getElementById('overlay');
    overlay.style.display = "flex"; 
    document.body.style.overflow = 'hidden';
    overlay.innerHTML = renderPokemonOverlay(pokemon);
    displayMain(pokemon.id);
}

function closeOverlay(event) {
    const overlay = document.getElementById('overlay');
    if(event.target === overlay){
    overlay.style.display = "none"; 
    document.body.style.overflow = 'auto'; 
    }
}

function displayMain(id){
    const pokemon = allPokemon.find(pokemon => pokemon.id === id);
    const mainCont = document.getElementById("pokemon_info");

    mainCont.innerHTML = renderMainContent(pokemon);

    document.getElementById("mainTab").classList.add("active");
    document.getElementById("statsTab").classList.remove("active");
}

function displayStats(id){
    const pokemon = allPokemon.find(pokemon => pokemon.id === id);
    const statsCont = document.getElementById("pokemon_info");

    statsCont.innerHTML = renderStatsContent(pokemon);

    document.getElementById("statsTab").classList.add("active");
    document.getElementById("mainTab").classList.remove("active");
}

async function navigatePokemon(direction, currentId) {
    let currentIndex = allPokemon.findIndex(p => p.id === currentId);
    let newIndex;

    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : allPokemon.length - 1;
    } else if (direction === 'next') {
        newIndex = currentIndex < allPokemon.length - 1 ? currentIndex + 1 : 0;
    }

    let nextPokemon = allPokemon[newIndex];
    showOverlay(nextPokemon.id); 
}

function searchPokemon() {
    let input = document.getElementById('searchInput').value;
    let filteredPokemon = filterPokemon(input);
    displayFilteredPokemon(filteredPokemon);
}

function displayFilteredPokemon(filteredPokemon) {
    let contentSection = document.getElementById('content');
    contentSection.innerHTML = '';

    filteredPokemon.forEach(pokemon => {
        contentSection.innerHTML += renderPokemon(pokemon);
    });
}

function filterPokemon(inputedWord){
    return allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(inputedWord.toLowerCase()));
}

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
    document.querySelector('button').disabled = true;
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.querySelector('button').disabled = false;
}

function showLoadButton() {
    document.getElementById('load_button').style.display= "flex";
}

async function init(){ 
    showLoadingSpinner();
    await displayPokemon();
    hideLoadingSpinner();
    showLoadButton();
}
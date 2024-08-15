const pokeName = document.querySelector('.poke_name');
const pokeNumber = document.querySelector('.poke_number');
const pokeImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');

const buttonSearch = document.querySelector('.btn_busca'); 

let searchPokemon = Math.floor(Math.random() * 649) + 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}` );

    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokeName.innerHTML = 'Loading ...';
    pokeNumber.innerHTML = '';
    pokeImg.style.display = 'block';

    const data = await fetchPokemon(pokemon);

    if(data){
    pokeName.innerHTML = data.name;
    pokeNumber.innerHTML = data.id;
    pokeImg.src = data ['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    pokeImg.style.display = 'block';
    input.value = '';
    searchPokemon = data.id
    }else{
        pokeName.innerHTML = 'Not found :(';
        pokeNumber.innerHTML = '';
        pokeImg.style.display = 'none';
        pokeImg.src = ''
        setTimeout(() => {
            renderPokemon(1); 
        }, 2000);
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () => {
searchPokemon += 1
renderPokemon(searchPokemon)
})

buttonSearch.addEventListener('click', () => {
    renderPokemon(input.value.toLowerCase());
});

renderPokemon (searchPokemon)
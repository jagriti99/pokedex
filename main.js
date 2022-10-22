const content = document.querySelector("#cards");
const button = document.querySelector(".button");
const searchPokedex = document.querySelector(".search");

let generation;
fetch("https://pokeapi.co/api/v2/generation")
  .then((res) => res.json())
  .then((data) => {
    generation = data.results;
    let pokemon = generation
      .map((item, index) => {
        return `<button class = "btn" onClick="getPokemon(${index}+1)">${item.name}</button>`;
      })
      .join("");
    button.innerHTML = pokemon;
  });

let species = [];
let pSpecies = [];

const getPokemon = (generationNumber) => {
  searchPokedex.innerHTML = "";
  pSpecies = [];
  const url = `https://pokeapi.co/api/v2/generation/${generationNumber}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      species = data.pokemon_species;

      const pokemonList = [];
      species.map((item) => {
        const splittedUrl = item.url.split("/");
        const number = splittedUrl[splittedUrl.length - 2];

        const prom = fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`)
          .then((res) => res.json())
          .then((data) => {
            const pokemonType = [];

            data.types.map((items) => {
              pokemonType.push(items.type["name"]);
            });

            const details = {
              name: item.name,
              number: number,
              types: pokemonType,
            };
            pSpecies.push(details);
          });
        pokemonList.push(prom);
      });

      Promise.all(pokemonList).then((unUsedRes) => {
        const i = document.createElement("input");
        i.id = "search";
        i.placeholder = "Search...";
        i.type = "text";
        i.onkeyup = searchPokemon;
        searchPokedex.appendChild(i);

        let itemData = pSpecies.map((item) => {
          return `<div class="card">
          <img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            item.number
          }.png" />
          <h2>${item.name}</h2>
          <span>${item.types.toString()}</span>
          </div>`;
        });
        content.innerHTML = itemData.join("");
      });
    });
};
const searchPokemon = () => {
  const searchInput = document.querySelector("#search");
  const pokeFilter = pSpecies.filter((item) => {
    const pokeName = item.name.startsWith(searchInput.value);
    return pokeName === true;
  });

  let itemData2 = pokeFilter.map((item) => {
    return `<div class="card">
    <img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      item.number
    }.png" />
    <h2>${item.name}</h2>
    <span>${item.types.toString()}</span>
    </div>`;
  });
  content.innerHTML = itemData2.join("");
};
// let pokeData = [];
// let newData = [];
// const fetchData = () => {
//   fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
//     .then((response) => response.json())
//     .then((data) => {
//       pokeData = data.results;
//       console.log(pokeData);

//       pokeData.map(function (url) {
//         const newUrl = url.url;
//         console.log(newUrl);

//         return fetch(`${newUrl}`)
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(data.sprites);
//           });
//       });

//       pokeCards();
//     });
// };

// const pokeCards = () => {
//   const cards = pokeData
//     .map((pokemon) => {
//       return `<div>
//         <img
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj1T1XR3T0HHgO8nDp-lDqq3WZhqmBoMLxxg&usqp=CAU" alt=""/>
//         <h2>${pokemon.name}</h2>
//         <h2>
//         </div>`;
//     })
//     .join("");
//   content.innerHTML = cards;
// };
// fetchData();

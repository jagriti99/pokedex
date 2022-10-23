const content = document.querySelector(".cards");
const button = document.querySelector(".button");
const searchPokedex = document.querySelector(".search");
const pokecount = document.querySelector(".pokenames");

let generation;
fetch("https://pokeapi.co/api/v2/generation")
  .then((res) => res.json())
  .then((data) => {
    generation = data.results;
    let pokemon = generation
      .map((item, index) => {
        return `<button class = "btn" onClick="getPokemon(${index}+1)">${capitalize(
          item.name.split("-")[0].substring(0, 3)
        )}${index + 1}</button>`;
      })
      .join("");
    button.innerHTML = pokemon;
  });

let species = [];
let pSpecies = [];

const getPokemon = (generationNumber) => {
  searchPokedex.innerHTML = "";
  const i = document.createElement("input");
  i.id = "search";
  i.placeholder = "Search";
  i.type = "search";
  i.addEventListener("input", (event) => {
    searchPokemon(event.target.value);
  });
  searchPokedex.appendChild(i);
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
        let itemData = pSpecies.map((item) => {
          return getCard(item.number, item.types, item.name);
        });
        pokecount.innerHTML = `<span>There are ${species.length} pokemons in generation ${generationNumber}</span>`;

        content.innerHTML = itemData.join("");

        content.innerHTML = itemData.join("");
      });
    });
};
const searchPokemon = (searchInput) => {
  const pokeFilter = pSpecies.filter((item) => {
    const pokeName = item.name.startsWith(searchInput.toLowerCase());
    return pokeName === true;
  });

  let itemData2 = pokeFilter.map((item) => {
    return getCard(item.number, item.types, item.name);
  });
  content.innerHTML = itemData2.join("");
};
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getCard = (number, types, name) => {
  return `<div class="card">
      <img class="pokemonImage" src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png" />
      <h2>${capitalize(name)}</h2>
      ${types
        .map((type) => {
          const typeUrl = `./assets/pokemon_types_icons/${type}.png`;
          return `<img class="typeIcon" src=${typeUrl}></img>`;
        })
        .join("")}
      </div>`;
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

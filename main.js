const content = document.querySelector(".pokedex");
let pokeData = [];
let newData = [];
const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    .then((response) => response.json())
    .then((data) => {
      pokeData = data.results;
      console.log(pokeData);

      pokeData.map(function (url) {
        const newUrl = url.url;
        console.log(newUrl);

        return fetch(`${newUrl}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.sprites);
          });
      });

      pokeCards();
    });
};

const pokeCards = () => {
  const cards = pokeData
    .map((pokemon) => {
      return `<div>
        <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj1T1XR3T0HHgO8nDp-lDqq3WZhqmBoMLxxg&usqp=CAU" alt=""/>
        <h2>${pokemon.name}</h2>
        <h2>
        </div>`;
    })
    .join("");
  content.innerHTML = cards;
};
fetchData();

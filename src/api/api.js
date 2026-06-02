export const requestResponse = async (res) => {
  if (res.ok) {
    try {
      return await res.json();
    } catch (error) {
      return null;
    }
  }
};

export const getPokemonData = () => {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(requestResponse);
};

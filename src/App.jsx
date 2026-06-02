import { use, useEffect, useState } from "react";
import { FilterBar } from "./components/filterBar";
import { Cards } from "./components/cards";
import { getPokemonData } from "./api/api";
import pokieFallback from "../src/img/pokie-fallback.jpeg";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Our use effect here, calls our main GET method. We then need to parse the response deeper and make another call to each of the responses URL properties. This gets us all the data we need.
  useEffect(() => {
    const getMaturePokemon = async () => {
      setLoading("Loading");
      const resData = await getPokemonData();
      const pokemonList = resData.results;

      const hatchedPokemon = await Promise.all(
        pokemonList.map(async (p) => {
          const result = await fetch(p.url);
          const data = await result.json();
          setLoading("Complete");

          // Just going to return the data we want to pass to each card!
          return {
            name: p.name ?? "No name found",
            image: data.sprites.front_default ?? pokieFallback,
            type: data.types.map((t) => t.type.name) ?? "No type found",
            id: data.id,
            hp: getStats(data.stats, "hp") ?? "--",
            attack: getStats(data.stats, "attack") ?? "--",
          };
        }),
      );

      setPokemonData(hatchedPokemon);
    };

    getMaturePokemon();
  }, []);

  // I want to add health and attack damage, but we need to parse even deeper for these. They exist in a sub array called "stats", the name of the stat then again, is another sub array of that. This function parses.
  const getStats = (stats, name) => {
    return stats.find((s) => s.stat.name === name)?.base_stat;
  };

  // filtering our pokemon data, and checking if the p.name is included in the search state!
  // Realized using one function here makes props less confusing. Chained together the search logic and filter logic.
  // This also fixed bug where search + filter did not work.
  const filteredPokemon = pokemonData
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      if (filter === "Low Health") return p.hp < 50;
      if (filter === "High Health") return p.hp > 50;
      return true;
    });

  // Pagination logic, we need to get the total pages, then use slice to determine our start and end..
  // Ex. since I got stuck here with the math. Page 2: (2 - 1) * 20 = start 20 then 2 * 20 = end 40..
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  console.log(totalPages);

  const pagination = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // reset our current page to one if I search or filter
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  return (
    <section className="px-2 py-5">
      <div className="container card p-5">
        <FilterBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
        {loading === "Loading" ? (
          <h1 className="my-5 py-5 text-center loading">Loading Pokemon</h1>
        ) : (
          <Cards
            filteredPokemon={pagination}
            pokemonData={pokemonData}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}

export default App;

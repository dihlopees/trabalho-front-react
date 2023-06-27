import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './PokeLists.css';

const PokeLists = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  // const navigate = useNavigate();

  const getPokemons = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=32&offset=${page}`
      );

      let allDataPokemons = data.results;
      let pokemonsWithImages = [];

      await Promise.all(
        allDataPokemons.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const pokemonData = {
            name: response.data.name,
            image: response.data.sprites.front_default,
          };

          return pokemonsWithImages.push(pokemonData);
        })
      );
      setPokemons(pokemonsWithImages);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const nextPage = () => {
    setPage(page + 1);
  };

  const returnPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    getPokemons();
  }, [page]);

  // const navigateTo = () => {
  //   navigate('/');
  // };

  const renderOptions = () => {
    if (loading) return <p>Carregando....</p>;

    return (
      <div className="container">
        <h3>Escolha seu pokemon </h3>

        <div className="container-lists">
          {pokemons?.map((it) => {
            return (
              <div>
                <p>{it.name}</p>
                <div className="border-img">
                  <img src={it.image} alt="pokemons" />
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <button
            onClick={() => {
              returnPage();
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              nextPage();
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return <div>{renderOptions()}</div>;
};

export default PokeLists;

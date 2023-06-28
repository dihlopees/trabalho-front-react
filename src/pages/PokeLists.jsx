import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PokeLists.css';

const PokeLists = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

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
            id: response.data.id,
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

  const onChangePageInput = (event) => {
    setPage(Number(event.target.value));
  };

  const renderOptions = () => {
    if (loading)
      return (
        <div className="center-loading">
          <CircularProgress color="secondary" />
        </div>
      );

    return (
      <div className="container">
        <h3>Clique no card para escolher seu pokemon :)</h3>

        <div className="container-lists">
          {pokemons?.map((it) => {
            return (
              <div onClick={() => navigate(`/pokemon/${it.id}`)}>
                <p>{it.name}</p>
                <div className="border-img">
                  <img src={it.image} alt="pokemons" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="container-buttons">
          <button
            disabled={page === 0}
            onClick={() => {
              returnPage();
            }}
          >
            Voltar
          </button>
          <input
            value={page}
            type="number"
            className="pagination-box"
            onChange={onChangePageInput}
          ></input>
          <button
            disabled={page === 20}
            onClick={() => {
              nextPage();
            }}
          >
            Próxima
          </button>
        </div>
      </div>
    );
  };

  return <div>{renderOptions()}</div>;
};

export default PokeLists;

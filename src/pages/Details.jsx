import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import './Details.css';

const Details = () => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getPokemonDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );
      const pokemonData = {
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        experience: data.base_experience,
        abilities: data.abilities[0].ability.name,
      };
      setPokemon(pokemonData);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);

  const renderOptions = () => {
    if (loading)
      return (
        <div className="center-loading">
          <CircularProgress color="secondary" />
        </div>
      );

    return (
      <div className="container-details">
        <Card pokemon={pokemon} />

        <div className='button-absolute'>
          <button onClick={() => navigate('/home')}>Voltar para Home</button>
        </div>
      </div>
    );
  };

  return <div>{renderOptions()}</div>;
};

export default Details;

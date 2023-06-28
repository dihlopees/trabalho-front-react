import './Card.css';

const Card = ({ pokemon }) => {
  return (
    <div className="container-card">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.image} alt="poke" />

      <div className="box-p">
        <p>
          <b>Experiência: </b>
          {pokemon.experience}
        </p>
        <p>
          <b>Habilidade:</b> {pokemon.abilities}
        </p>
      </div>
    </div>
  );
};

export default Card;

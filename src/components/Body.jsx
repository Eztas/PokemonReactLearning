import PokemonThumbnails from './PokemonThumbnails';
import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonProvider';

function Body() {
    const {pokemons, language} = useContext(PokemonContext); // ポケモンのデータを格納する

    const showPokemon = (pokemon) => {
      const pokemonTranslations = {
        en: { name: pokemon.nameEn, type: pokemon.typeEn },
        ja: { name: pokemon.nameJa, type: pokemon.typeJa },
      };
      const { name, type } = pokemonTranslations[language];
      
      return (
        <PokemonThumbnails
          key={pokemon.id}
          id={pokemon.id}
          name={name}
          iconImage={pokemon.iconImage}
          image={pokemon.image}
          type={type}
          colorType={pokemon.typeEn}
        />
      );
    };

    return (
        <div className='all-container'>
          {pokemons.map((pokemon, index) => (
            showPokemon(pokemon)
          ))}
        </div>
    );
}

export default Body;

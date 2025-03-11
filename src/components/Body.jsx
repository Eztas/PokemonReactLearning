import PokemonThumbnails from './PokemonThumbnails';
import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonProvider';

function Body() {
    const {pokemons, language, isFetchError} = useContext(PokemonContext); // ポケモンのデータを格納する

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
      <div>
        {isFetchError ? 
        (
          <div>ポケモンデータを取得できませんでした</div>
        ) :(      
          <div className='all-container'>
            {pokemons.map((pokemon, index) => (
              showPokemon(pokemon)
            ))}
          </div>
        )}
      </div>
    );
}

export default Body;

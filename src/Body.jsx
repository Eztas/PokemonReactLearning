import PokemonThumbnails from './PokemonThumbnails';
import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

function Body() {
    const {pokemons, language} = useContext(PokemonContext); // ポケモンのデータを格納する

    const showPokemon = (pokemon) => {
      switch (language) {
        case 'en':
          return (
            <PokemonThumbnails
              key={pokemon.id} // keyを設定し, 警告を回避
              id={pokemon.id}
              name={pokemon.nameEn}
              iconImage={pokemon.iconImage}
              image={pokemon.image}
              type={pokemon.typeEn} 
              colorType={pokemon.typeEn}
            />
          );
        case 'ja':
          return (
            <PokemonThumbnails
              key={pokemon.id} // keyを設定し, 警告を回避
              id={pokemon.id}
              name={pokemon.nameJa}
              iconImage={pokemon.iconImage}
              image={pokemon.image}
              type={pokemon.typeJa}
              colorType={pokemon.typeEn}
            />
          );
        default:
          return (
            <PokemonThumbnails
              key={pokemon.id} // keyを設定し, 警告を回避
              id={pokemon.id}
              name={pokemon.nameEn}
              iconImage={pokemon.iconImage}
              image={pokemon.image}
              type={pokemon.typeEn} 
              colorType={pokemon.typeEn}
            />
          );
      }
    }

    return (
        <div className='all-container'>
          {pokemons.map((pokemon, index) => (
            // enかjaか(今回はelse)で表示を変える
            showPokemon(pokemon)
          ))}
        </div>
    );
}

export default Body;

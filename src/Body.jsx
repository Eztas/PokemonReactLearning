import PokemonThumbnails from './PokemonThumbnails';
import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

// コンテキスト化しておくと、コンポーネント化するときに楽になる

function Body() {
    const {pokemons, language} = useContext(PokemonContext); // ポケモンのデータを格納する
    return (
        <div className='all-container'>
          {pokemons.map((pokemon, index) => (
            // enかjaか(今回はelse)で表示を変える
            language === 'en' ?
            <PokemonThumbnails
              key={pokemon.id} // keyを設定し, 警告を回避
              id={pokemon.id}
              name={pokemon.nameEn}
              iconImage={pokemon.iconImage}
              image={pokemon.image}
              type={pokemon.typeEn} 
              colorType={pokemon.typeEn}
            />
            :
            <PokemonThumbnails
              key={pokemon.id} // keyを設定し, 警告を回避
              id={pokemon.id}
              name={pokemon.nameJa}
              iconImage={pokemon.iconImage}
              image={pokemon.image}
              type={pokemon.typeJa}
              colorType={pokemon.typeEn}
            />
          ))}
        </div>
    );
}

export default Body;

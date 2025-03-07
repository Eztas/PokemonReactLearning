import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';


// 引数は{}で囲う, 理屈はよく分からない
// HTMLと同じで, getAllPokemonsだけだと, onClick="getAllPokemons"と誤認識
// LookMoreがDOMを返すからこそ起きる(?)
// getAllPokemonsだけだと、props配列(ただのオブジェクト名)と認識されるだけで、
// getAllPokemons.getAllPokemonsとしないといけない

// getAllPokemons, getAllPokemons.getAllPokemonsか
// {getAllPokemons}, getAllPokemonsの2択
function LookMore({getAllPokemons}) {
    const {isReloading, language} = useContext(PokemonContext);

    return (
        <div className="look-more">
            {isReloading ? (
                <div className='load-more'>Now Loading…</div>
            ): (
                language === 'en' ? (
                    <button className='load-more' onClick={getAllPokemons}>
                        Look More Pokemons！
                    </button>
                ) : (
                    <button className='load-more' onClick={getAllPokemons}>
                        もっと見る！
                    </button>
                )
            )}
        </div>
    )
}

export default LookMore;
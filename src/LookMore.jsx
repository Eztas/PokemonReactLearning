import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

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
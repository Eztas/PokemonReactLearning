import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonProvider';

function LookMore({getAllPokemons}) {
    const {isReloading, language} = useContext(PokemonContext);

    const lookMoreTranslations = {
        en: {
            buttonText: "Look More Pokemons！",
        },
        ja: {
            buttonText: "もっと見る！",
        }
      };
    
    return (
        <div className="look-more">
            {isReloading ? (
                <div className='load-more'>Now Loading…</div>
            ): (
                <button className='load-more' onClick={getAllPokemons}>
                    {lookMoreTranslations[language].buttonText}
                </button>
            )}
        </div>
    )
}

export default LookMore;
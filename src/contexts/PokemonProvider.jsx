import {useState, createContext} from 'react';
export const PokemonContext = createContext();

// childrenにJapaneseAppなどの子コンポーネント関数が加えられる
function PokemonProvider({children}) {
    const LIMIT_NUMBER = 20; // パラメータにlimitを設定し、20件取得する

    const [pokemons, setPokemons] = useState([]); // ポケモンのデータを格納する
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_NUMBER}`); // APIのURLを格納
    const [isReloading, setIsReloading] = useState(false);
    const [isFetchError, setIsFetchError] = useState(false);
    const [language, setLanguage] = useState('ja');

    return (
        <PokemonContext.Provider 
            value={{ 
                pokemons, setPokemons, 
                url, setUrl, 
                isReloading, setIsReloading, 
                isFetchError, setIsFetchError, 
                language, setLanguage 
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider
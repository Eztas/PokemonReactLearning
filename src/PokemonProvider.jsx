import {useState, createContext} from 'react';
import JapaneseApp from './JapaneseApp';
import EnglishApp from './EnglishApp';

export const PokemonContext = createContext();

function PokemonProvider() {
    const LIMIT_NUMBER = 20; // パラメータにlimitを設定し、20件取得する
    
    const [pokemons, setPokemons] = useState([]); // ポケモンのデータを格納する
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_NUMBER}`); // APIのURLを格納

    return (
        <PokemonContext.Provider value={{ pokemons, setPokemons, url, setUrl }}>
            <EnglishApp />
        </PokemonContext.Provider>
    )
}

export default PokemonProvider
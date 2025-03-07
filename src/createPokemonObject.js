import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';
import { translatePokemon } from './api/translatePokemon';

// アロー関数でポケモン1体の情報を生成
// まだここでも形式として関数を作っただけで、この関数の出力はUI上では出力されない
export const createPokemonObject = (pokemonsData) => {
    const {pokemons, setPokemons } = useContext(PokemonContext); // ポケモンのデータを格納する
    // アロー関数で, 配列.forEach (引数 => 結果(動作内容))で定義
    pokemonsData.forEach ((pokemon) => {
        const pokemonUrl = pokemon.url;
        fetch(pokemonUrl) // ただ単にfetchをしているだけだと、非同期処理のため、データ取得順が一意ではない
        .then(res => res.json())
        .then(data => {
        const pokemonJa = translatePokemon(data.name, data.types[0].type.name)
        // ポケモン1体の情報に関するオブジェクト生成
        const newPokemonData = {
            id: data.id, // ポケモンの番号
            nameJa: pokemonJa.name, // ポケモンの日本名
            nameEn: data.name, // ポケモンの英語名
            iconImage: data.sprites.other.dream_world.front_default, // ホバー時のポケモンのアイコン画像
            image: data.sprites.other["official-artwork"].front_default, // ポケモンの画像
            typeJa: pokemonJa.type, // ポケモンのタイプ(日本語)
            typeEn: data.types[0].type.name // ポケモンのタイプ(英語)
        }

        // forEachで1-20件目のポケモンのデータを格納
        // スプレッド構文で、現在のポケモンデータを展開して、新しいポケモンデータを追加する形で状態更新
        // 非同期であり、順番が一意ではないのでsortしながら追加
        setPokemons(currentPokemonData => [...currentPokemonData, newPokemonData].sort((a, b) => a.id - b.id));
        })
    })
}
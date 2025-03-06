import PokemonThumbnails from './PokemonThumbnails';
import { useEffect, useState } from 'react';
import pokemonNameJaEnJson from "./api/pokemonNameJaEn.json";
import pokemonTypeJson from "./api/pokemonType.json";

function App() {

  // フック(useStateやuseEffect)は、関数コンポーネント内でのみ使用可能
  // そうしないと、順序の保証や状態が混同し、管理しにくくなるため

  const LIMIT_NUMBER = 20; // パラメータにlimitを設定し、20件取得する

  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_NUMBER}`); // APIのURLを格納
  const [pokemons, setPokemons] = useState([]); // ポケモンのデータを格納する
  const [isReloading, setIsReloading] = useState(false); // リロード中かどうかの状態を格納

  const translatePokemonName = (pokemonNameEn, pokemonTypeEn) => {
    const pokemonNameJa = pokemonNameJaEnJson.find(
      (pokemonNameJaEn) => pokemonNameJaEn.en.toLowerCase() === pokemonNameEn
    ).ja;
    const pokemonTypeJa = pokemonTypeJson[pokemonTypeEn];
    return {name: pokemonNameJa, type: pokemonTypeJa};
  }

  const getAllPokemons = () => {
    setIsReloading(true); // リロード中の状態をtrueにする
    fetch(url)
      .then(res => res.json()) 
      .then(data => {              // data = res.json()
        createPokemonObject(data.results); // APIで取得したポケモンの情報に関するオブジェクト生成
        setUrl(data.next); // 次の20件(21件目から40件目)をURLにセットする
      })
      .finally(() => setIsReloading(false)); // リロード中の状態をfalseにする
  }

  // アロー関数でポケモン1体の情報を生成
  // まだここでも形式として関数を作っただけで、この関数の出力はUI上では出力されない
  const createPokemonObject = (pokemons) => {
    // アロー関数で, 配列.forEach (引数 => 結果(動作内容))で定義
    pokemons.forEach ((pokemon) => {
      const pokemonUrl = pokemon.url;
      fetch(pokemonUrl) // ただ単にfetchをしているだけだと、非同期処理のため、データ取得順が一意ではない
      .then(res => res.json())
      .then(data => {
        const pokemonJa = translatePokemonName(data.name, data.types[0].type.name)
        // ポケモン1体の情報に関するオブジェクト生成
        const newPokemonData = {
          id: data.id, // ポケモンの番号
          //name: data.name, // ポケモンの名前
          name: pokemonJa.name, // ポケモンの日本名
          iconImage: data.sprites.other.dream_world.front_default, // ホバー時のポケモンのアイコン画像
          image: data.sprites.other["official-artwork"].front_default, // ポケモンの画像
          //type: data.types[0].type.name // ポケモンのタイプ
          type: pokemonJa.type // ポケモンのタイプ
        }

        // forEachで1-20件目のポケモンのデータを格納
        // スプレッド構文で、現在のポケモンデータを展開して、新しいポケモンデータを追加する形で状態更新
        // 非同期であり、順番が一意ではないのでsortしながら追加
        setPokemons(currentPokemonData => [...currentPokemonData, newPokemonData].sort((a, b) => a.id - b.id));
      })
    })
  }

  // useEffectの第1引数では、アロー関数で、引数 => 結果(動作内容)で定義
  useEffect(() => {
    getAllPokemons();
  }, []) // API元の内容変化時の再レンダリングは今回無視, そのため[]を第2引数

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
          {pokemons.map((pokemon, index) => (
            <PokemonThumbnails
              key={pokemon.id} // keyを設定し, 警告を回避
              id={pokemon.id}
              name={pokemon.name}
              iconImage={pokemon.iconImage}
              image={pokemon.image}
              type={pokemon.type} 
            />
          ))}
        </div>
        {isReloading ? (
          <div className='load-more'>Now Loading…</div>
        ): (
          <button className='load-more' onClick={getAllPokemons}>
            もっとみる！
          </button>
        )}
      </div>
    </div>
  )
}

export default App;

import PokemonThumbnails from './PokemonThumbnails';
import { useEffect, useState } from 'react';

function App() {

  // フック(useStateやuseEffect)は、関数コンポーネント内でのみ使用可能
  // そうしないと、順序の保証や状態が混同し、管理しにくくなるため

  // パラメータにlimitを設定し、20件取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  // ポケモンのデータを格納する
  const [pokemons, setPokemons] = useState([]);

  const getAllPokemons = () => {
    fetch(url)
      .then(res => res.json()) 
      .then(data => {              // data = res.json()
        //console.log('1'+data.results); // データの確認
        createPokemonObject(data.results); // APIで取得したポケモンの情報に関するオブジェクト生成
        setUrl(data.next); // 次の20件(21件目から40件目)をURLにセットする
      })
  }

  // アロー関数でポケモン1体の情報を生成
  // まだここでも形式として関数を作っただけで、この関数の出力はUI上では出力されない
  const createPokemonObject = (pokemons) => {
    // アロー関数で, 配列.forEach (引数 => 結果(動作内容))で定義
    pokemons.forEach ((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
      .then(res => res.json())
      .then(data => {
        // ポケモン1体の情報に関するオブジェクト生成
        const newPokemonData = {
          id: data.id, // ポケモンの番号
          name: data.name, // ポケモンの名前
          image: data.sprites.other["official-artwork"].front_default, // ポケモンの画像
          type: data.types[0].type.name // ポケモンのタイプ
        }

        // forEachで1-20件目のポケモンのデータを格納
        // スプレッド構文で、現在のポケモンデータを展開して、新しいポケモンデータを追加する形で状態更新
        setPokemons(currentPokemonData => [...currentPokemonData, newPokemonData]);
      })
    })
    setPokemons(currentPokemonData => currentPokemonData.sort((a, b) => a.id - b.id));
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
          {pokemons.map((pokemon, index) => ( // 今はまだallPokemonsではなく仮データのpokemonsを使用
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              type={pokemon.type} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;

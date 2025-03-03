import PokemonThumbnails from './PokemonThumbnails';
import { useEffect, useState } from 'react';

function App() {

  // フック(useStateやuseEffect)は、関数コンポーネント内でのみ使用可能
  // そうしないと、順序の保証や状態が混同し、管理しにくくなるため

  // パラメータにlimitを設定し、20件取得する
  const LIMIT_NUMBER = 20;
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_NUMBER}`); // APIのURLを格納
  // ポケモンのデータを格納する
  const [pokemons, setPokemons] = useState([]);

  // 2回呼び出されている?
  // 本来useEffectで、1回だけのはず
  const getAllPokemons = () => {
    fetch(url)
      .then(res => res.json()) 
      .then(data => {              // data = res.json()
        console.log("Initial Pokémon list:", data.results);
        createPokemonObject(data.results); // APIで取得したポケモンの情報に関するオブジェクト生成
        setUrl(data.next); // 次の20件(21件目から40件目)をURLにセットする
      })
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
        // ポケモン1体の情報に関するオブジェクト生成
        const newPokemonData = {
          id: data.id, // ポケモンの番号
          name: data.name, // ポケモンの名前
          image: data.sprites.other["official-artwork"].front_default, // ポケモンの画像
          type: data.types[0].type.name // ポケモンのタイプ
        }
        console.log("Adding Pokémon:", newPokemonData.id, newPokemonData.name);

        // forEachで1-20件目のポケモンのデータを格納
        // スプレッド構文で、現在のポケモンデータを展開して、新しいポケモンデータを追加する形で状態更新
        // 非同期であり、順番が一意ではないのでsortしながら追加
        setPokemons(currentPokemonData => [...currentPokemonData, newPokemonData].sort((a, b) => a.id - b.id));
      })
    })
  }

  // useEffectの第1引数では、アロー関数で、引数 => 結果(動作内容)で定義
  // ホットリロードが関係？, 1回目のレンダリング時にuseEffectが2回呼び出されている

  // React Strict Modeは、開発環境でコンポーネントを2回レンダリングすることで、潜在的な問題を検出します。これにより、useEffectが2回実行され、getAllPokemonsも2回呼び出されます。ログから「useeffect before」「useeffect after」が2回表示されていることが確認できます。


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
              key={pokemon.id} // keyを設定し, 警告を回避
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

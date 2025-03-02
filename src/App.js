import './App.css';
import PokemonThumbnails from './PokemonThumbnails';
import pokemons from './Pokemon';
import { useEffect } from 'react';

// APIからデータを取得する
const url = "https://pokeapi.co/api/v2/pokemon";

// useEffectを使ってAPIからデータを取得する
// useEffectを使わないとそのコードが毎回実行され、不要なAPI呼び出しが増えてパフォーマンスが悪化
// イベントリスナ系でも、長時間余計に動作することもある
// Reactでは関数コンポーネントが、状態（state）やプロップ（props）が変わるたびに再レンダリングされる仕様
// 初回レンダリング以外でも再レンダリングのたびに実行されるのが基本性能となっている
// そうしないと、最新の情報をがUIで表示されないため、UXが悪化する
// そのため、useEffectで関数の実行頻度やタイミングを制御する

// 第2引数に空の配列を渡すことで、初回のみ実行されるように設定
// https://ja.react.dev/reference/react/useEffect

// useEffectの第1引数では、アロー関数で、引数 => 結果(動作内容)で定義
useEffect(() => {
  fetch(url)
  .then((response) => response.json()) //2つのthenで非同期的にデータの処理
  .then((data) => {   // data = response.json()の結果
    console.log(data) // 1つ目のthenでレスポンスを受け取り, 2つ目のthenでjson形式のデータを取得
  })
}, [])

function App() {
  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
        {/* map関数で端的にポケモンを複数分表示 */}
          {pokemons.map((pokemon, index) => (
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

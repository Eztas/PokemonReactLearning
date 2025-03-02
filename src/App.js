import './App.css';
import PokemonThumbnails from './PokemonThumbnails';
import pokemons from './Pokemon';
import { useEffect } from 'react';

// APIからデータを取得する
const url = "https://pokeapi.co/api/v2/pokemon";

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

import './App.css';
import PokemonThumbnails from './PokemonThumbnails';
import pokemons from './Pokemon';
import { useEffect, useState } from 'react';

function App() {

  // フック(useStateやuseEffect)は、関数コンポーネント内でのみ使用可能
  // そうしないと、順序の保証や状態が混同し、管理しにくくなるため

  // APIからデータを取得する
  const url = "https://pokeapi.co/api/v2/pokemon";
  const fusigidaneUrl = "https://pokeapi.co/api/v2/pokemon/bulbasaur" // 仮データにフシギダネのデータ

  // アロー関数でポケモン1体の情報を生成
  const createPokemonObject = (pokemonUrl) => {
    fetch(pokemonUrl)
    .then(responce => responce.json())
    .then(data => {
      console.log(data);
      // ポケモンの画像の場所
      // - (ハイフン)にlintで自動で半角スペースが入ってしまうため、[]で対応
      // data.sprites.other.official-artwork.front_default でも大丈夫です
      console.log(data.sprites.other["official-artwork"].front_default);
      // ポケモンのタイプの場所
      console.log(data.types[0].type.name);
    })
  }

  // ポケモンの名前の状態管理, useStateの引数は初期値
  const [pokemonNames, setPokemonNames] = useState([]);

  // useEffectの第1引数では、アロー関数で、引数 => 結果(動作内容)で定義
  useEffect(() => {
    fetch(url)
    .then((response) => response.json()) //2つのthenで非同期的にデータの処理
    .then((data) => {   // data = response.json()の結果
      console.log(data) // 1つ目のthenでレスポンスを受け取り, 2つ目のthenでjson形式のデータを取得
      const names = [
        data.results[0].name,
        data.results[1].name,
        data.results[2].name,
      ]
      setPokemonNames(names);
    })
    createPokemonObject(fusigidaneUrl);
  }, [])

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
        {/* map関数で端的にポケモンを複数分表示 */}
          {pokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemonNames[index]}
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

import PokemonThumbnails from './PokemonThumbnails';
import pokemons from './Pokemon';
import { useEffect, useState } from 'react';

function App() {

  // フック(useStateやuseEffect)は、関数コンポーネント内でのみ使用可能
  // そうしないと、順序の保証や状態が混同し、管理しにくくなるため

  // APIからデータを取得する
  const fusigidaneUrl = "https://pokeapi.co/api/v2/pokemon/bulbasaur" // 仮データにフシギダネのデータ
  // パラメータにlimitを設定し、20件取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  // ポケモンの全データを格納する
  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemons = () => {
    fetch(url)
      .then(res => res.json()) 
      .then(data => {              // data = res.json()
        console.log(data.results); // resultsには20件のポケモンのデータが入っている
        setAllPokemons(data.results); // 1-20件目のポケモンのデータを格納

        // 次の20件(21件目から40件目)をURLにセットする
        setUrl(data.next);
      })
  }

  // アロー関数でポケモン1体の情報を生成
  // まだここでも形式として関数を作っただけで、この関数の出力はUI上では出力されない
  const createPokemonObject = (pokemonUrl) => {
    fetch(pokemonUrl)
    .then(res => res.json())
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

  // useEffectの第1引数では、アロー関数で、引数 => 結果(動作内容)で定義
  useEffect(() => {
    getAllPokemons();
    createPokemonObject(fusigidaneUrl);
  }, []) 
  // allPokemonsが再定義されたときに再レンダリングされる必要があるため、
  // useEffectの第2引数にgetAllPokemonsを指定する方がいい(そうしないと警告が出る)が、
  // 本質ではないので今回は無視

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
        {/* map関数で端的にポケモンを複数分表示 */}
          {pokemons.map((pokemon, index) => ( // 今はまだallPokemonsではなく仮データのpokemonsを使用
            <PokemonThumbnails
              id={pokemon.id}
              // 初回レンダリングの際にエラーになるので、オプショナルチェーン(?)をつける
              name={allPokemons[index]?.name}
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

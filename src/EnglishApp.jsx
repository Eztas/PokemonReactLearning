import PokemonThumbnails from './PokemonThumbnails';
import { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { PokemonContext } from './PokemonProvider';
import { createPokemonObject } from './createPokemonObject';

function EnglishApp() {

  // フック(useStateやuseEffect)は、関数コンポーネント内でのみ使用可能
  // そうしないと、順序の保証や状態が混同し、管理しにくくなるため

  const {pokemons, setPokemons, url, setUrl} = useContext(PokemonContext); // ポケモンのデータを格納する
  const [isReloading, setIsReloading] = useState(false); // リロード中かどうかの状態を格納

  const getAllPokemons = () => {
    setIsReloading(true); // リロード中の状態をtrueにする
    fetch(url)
      .then(res => res.json()) 
      .then(data => {              // data = res.json()
        createPokemonObject(data.results, setPokemons); // APIで取得したポケモンの情報に関するオブジェクト生成
        setUrl(data.next); // 次の20件(21件目から40件目)をURLにセットする
      })
      .finally(() => setIsReloading(false)); // リロード中の状態をfalseにする
  }

  // useEffectの第1引数では、アロー関数で、引数 => 結果(動作内容)で定義
  useEffect(() => {
    getAllPokemons();
  }, []) // API元の内容変化時の再レンダリングは今回無視, そのため[]を第2引数

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      {<Link to="/JapaneseApp">日本語版図鑑はこちらから</Link>}
      <div className='pokemon-container'>
        <div className='all-container'>
          {pokemons.map((pokemon, index) => (
            <PokemonThumbnails
              key={pokemon.id} // keyを設定し, 警告を回避
              id={pokemon.id}
              name={pokemon.nameEn}
              iconImage={pokemon.iconImage}
              image={pokemon.image}
              type={pokemon.typeEn} 
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

export default EnglishApp;

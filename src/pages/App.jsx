import Header from '../components/Header';
import Body from '../components/Body';
import LookMore from '../components/LookMore';
import { useEffect, useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonProvider';
import { createPokemonObject } from '../api/createPokemonObject';

function App() {

  // フック(useStateやuseEffect)は、関数コンポーネント内でのみ使用可能
  // そうしないと、順序の保証や状態が混同し、管理しにくくなるため
  const {setPokemons, 
         url, 
         setUrl,  
         setIsReloading} = useContext(PokemonContext); // ポケモンのデータを格納する

  // reloadingをuseStateで管理とかにすると、日本語ページと英語ページで競合しそうなのでここはコンポーネント化しない
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
      <Header />
      <div className='pokemon-container'>
        <Body />
        <LookMore getAllPokemons={getAllPokemons} />
      </div>
    </div>
  )
}

export default App;

import './App.css';
import PokemonThumbnails from './PokemonThumbnails';
import pokemon from './Pokemon';

function App() {
  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
        {/* 仮で３つの子コンポーネントを表示する */}
          <PokemonThumbnails
            id={pokemon[0].id}
            name={pokemon[0].name}
            image={pokemon[0].image}
            type={pokemon[0].type} />
          <PokemonThumbnails
            id={pokemon[1].id}
            name={pokemon[1].name}
            image={pokemon[1].image}
            type={pokemon[1].type} />
          <PokemonThumbnails
            id={pokemon[2].id}
            name={pokemon[2].name}
            image={pokemon[2].image}
            type={pokemon[2].type} />
        </div>
      </div>
    </div>
  )
}

export default App;

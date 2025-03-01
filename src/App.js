import './App.css';
import PokemonThumbnails from './PokemonThumbnails';
import pokemons from './Pokemon';

// https://typescriptbook.jp/reference/functions/iife#react%E3%81%AEuseeffect%E3%81%AA%E3%81%A9%E9%9D%9E%E5%90%8C%E6%9C%9F%E9%96%A2%E6%95%B0%E3%82%92%E5%8F%97%E3%81%91%E5%8F%96%E3%82%89%E3%81%AA%E3%81%84%E5%BC%95%E6%95%B0%E3%81%AB%E9%9D%9E%E5%90%8C%E6%9C%9F%E5%87%A6%E7%90%86%E3%82%92%E6%B8%A1%E3%81%97%E3%81%9F%E3%81%84%E5%A0%B4%E5%90%88

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

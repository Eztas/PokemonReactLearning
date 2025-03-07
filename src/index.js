import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PokemonProvider from './PokemonProvider';
import JapaneseApp from './JapaneseApp';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode> // 2回useEffectが行われる要因のため、ひとまず行わない
    <BrowserRouter>
      <PokemonProvider>
        <JapaneseApp />
      </PokemonProvider>
    </BrowserRouter>
  //</React.StrictMode>
);

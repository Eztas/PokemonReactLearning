import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PokemonProvider from './contexts/PokemonProvider';
import JapaneseApp from './pages/JapaneseApp';
import EnglishApp from './pages/EnglishApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode> // 2回useEffectが行われる要因のため、ひとまず行わない
    <BrowserRouter>
      <PokemonProvider>
      <Routes>
        <Route path="/" element={<JapaneseApp />} />
        <Route path="/JapaneseApp" element={<JapaneseApp />} />
        <Route path="/EnglishApp" element={<EnglishApp />} />
      </Routes>
      </PokemonProvider>
    </BrowserRouter>
  //</React.StrictMode>
);

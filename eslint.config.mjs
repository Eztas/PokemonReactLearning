import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';


export default defineConfig([
  // eslint設定時、デフォルトで書き込まれる内容
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: { globals: {...globals.browser, ...globals.node} } 
  },
  { files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },

  // 自分で追加した内容
  // useEffectで第2引数を空配列にしたときの警告を無視できるようにする
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  pluginReact.configs.flat.recommended,
]);

/*
WARNING in [eslint] 
src\pages\App.jsx
  Line 38:6:  React Hook useEffect has a missing dependency: 'getPokemons'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

webpack compiled with 1 warning

この警告を無視できるようにする
*/

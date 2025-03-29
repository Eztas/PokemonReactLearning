import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import pluginReactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js"; // 追加

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
  // https://qiita.com/Yasushi-Mo/items/c2e259f8e2a86b79cb8a
  {
    files: ['**/*.{js,jsx}'],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react/prop-types': 'off', // PropTypesチェックを無効化, javascript版なので型に関しての忠告は今回無視
      'react-hooks/exhaustive-deps': 'off',
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  pluginReact.configs.flat.recommended,
  pluginReactJSXRuntime,
]);

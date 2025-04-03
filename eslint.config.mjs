import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import pluginReactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js"; // 'React' must be in scope when using JSX  react/react-in-jsx-scopeに対応

export default defineConfig([
  // eslint設定時、デフォルトで書き込まれる内容
  { files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: [
      'prettier', // Prettierとの競合を避けるため、必ず最後に配置
    ],
   },
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: { globals: {...globals.browser, ...globals.node} } 
  },
  { files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { js }, 
    extends: [
      "js/recommended",
    ] 
  },
  pluginReact.configs.flat.recommended,

  // 自分で追加した内容
  pluginReactJSXRuntime, // 'React' must be in scope when using JSX  react/react-in-jsx-scopeに対応
  {
    files: ['**/*.{js,jsx}'],
    settings: {
      react: {
        version: "detect", // versionを自動で検知できるようにする
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react/prop-types': 'off', // PropTypesチェックを無効化, javascript版なので型に関しての忠告は今回無視
      'no-unused-vars': 'off', // 未使用の変数を無視する, firebaseなど拡張用に残しているコードもある
      'react-hooks/exhaustive-deps': 'off', // useEffectで第2引数を空配列にしたときの警告を無視できるようにする
    },
  },
]);

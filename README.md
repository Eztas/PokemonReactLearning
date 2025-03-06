# Git Command

## ローカルで作成したリポジトリをリモートのリポジトリに移行
```
git init
git add .
git commit -m "initial comment"
git remote add origin https://github.com/Eztas/PokemonReactLearning.git
git push -u origin main
```

`git init`で初期化をする

`git add .`で全てのコミット内容をステージに上げる

`git commit -m "コミットメッセージ"`でコミット, -mのコマンドオプションでメッセージを付与可能

`git remote add`でリモートのリポジトリに追加すること示唆する

`origin`はリモートリポジトリの「名前」を指す, 慣習的にoriginとしている

`https://github.com/Eztas/PokemonReactLearning.git`
でoriginという名前のリポジトリの場所(URL)を示す

`git push -u origin main`で、ローカルの`main`ブランチの内容を`origin`という名前のリモートリポジトリの`main`ブランチにプッシュするというもの

`-u`は`--set-upstream`の略で、これをつけると
今後、オプションをつけなくても
ローカルの`main`とリモートの`main`をトラッキングを設定し、今後の動作を簡略化することができる(`git push`だけで勝手にpushされる等)

## ローカルやリモートのブランチの削除

```
git branch -d give_prop
git push origin --delete give_prop
```

上がローカルのブランチ削除

下がリモートのブランチ削除

## ブランチ名の変更

```
git branch -m 3_pokemon_api_use_state_effect
git push origin --delete 3_pokemon_api_use_effect
git branch --set-upstream-to=origin/3_pokemon_api_use_state_effect 3_pokemon_api_use_state_effect
```

1行目: ローカルブランチの変更

2行目: リモートにある変更前のブランチを削除

3行目: ローカルとリモートのブランチを紐づける

# 記録
2025/02/28 スタート

2025/03/01 props, アロー関数, map

2025/03/02 useEffect, useState

2025/03/03~2025/03/04 useEffectを使っているのに、2回実行される問題に対応

2025/03/04 ポケモン情報追加機能, onclickの際の関数の扱い

2025/03/04~06 日本語対応, jsonデータの扱い

2025/03/06 デプロイ前のリファクタリング(useContextによるデータ共有, 日本語と英語版の実装)

# React個人的まとめ

## Reactの基本仕様

Reactでは関数コンポーネントが、状態（state）やプロップ（props）が変わるたびに再レンダリングされる仕様

そうしないと、最新の情報がUIで表示されないため、UXが悪化

## マウントとレンダリング

マウントは、コンポーネントが初めてDOMに追加され、実際のHTML要素がページに「表示：されるプロセス

これには、初期レンダリングが含まれ、コンポーネントが画面に現れる瞬間を示唆

例えば、componentDidMount（クラスコンポーネント）やuseEffect（関数コンポーネント、空の依存配列）はマウント時に実行

レンダリングは、コンポーネントのrenderメソッド（クラスコンポーネント）または関数本体（関数コンポーネント）が呼び出され、仮想DOMを「生成」するプロセス 

これは、コンポーネントが状態やプロップスが変わるたびに起こり、初期表示時も包含

レンダリングはマウントを含む初期表示時と更新時に起こるプロセスであるのに対し

マウントは初期表示時の一度きりのプロセス

一度表示すれば、再生成するだけで更新されるため、マウントは初期表示の1回きり

## 関数の扱い

onClick = 関数において,onClick = 関数名()を渡すと無限に実行される可能性がある

onClick={関数名} は関数の参照を渡すだけ

onClick={関数名()} は関数の返り値を渡す, その返り値を渡すために関数が実行される

今回だと実行される->ポケモン情報追加->再レンダリング->また{}内実行->返り値を返そうと実行

関数オブジェクトだけを渡すことで、トリガー発生時に関数が実行されるようになる

## フック

関数のトップレベル(ループ、条件文など)で呼ばない

グローバルで呼ばない

状態管理にして不具合が起こる可能性があるため

## useEffect
useEffectを使わないとそのコードが毎回実行され、不要なAPI呼び出しが増えてパフォーマンスが悪化

イベントリスナ系でも、長時間余計に動作

そのため、useEffectで関数の実行頻度やタイミングを制御

第2引数に空の配列を渡すことで、初回のみ実行されるように設定

つまり、あまり何回も実行したくないことはuseEffectで行うようにする

しかし、StrictModeではマウントが2回されるので、開発環境では2度実行される

(useEffect)[https://ja.react.dev/reference/react/useEffect]

## useState

これで変数の値を管理することで、値が変更した時に、UI上でも変更が反映

ただの変数代入でこれを実現すると、値が変更してもUIに反映されない

仮にリロードで再レンダリングしても、コンポーネント関数の再実行により、変数は初期化されるため、結局変更はUIに反映されない

UI上で操作をして、値が変更されるとき、値を初期化しないようにしつつ、
UI上で変更を反映させるために使用

## useContext

バケツリレー(propsに値を入れて、ファイル間に値を渡す手法)をせずに、データを渡すことが可能

一元管理も容易

useStateなどの変化される値は、基本的にuseContextで管理して、バケツリレーを防げるようにした方が良い

Providerで囲うことで、他ファイルでも共有できるようにする

そして、Contextを使うときはuseContextを使って、共有されている状態を受け取る

```
export const Context = createContext();
```

これで、exportにより、外部ファイルからでもContextを使えるようにする

```
const {…} = useContext(Context);
```

exportされたContextを引数にしながら、useContextを使うことで、
使いたい状態を受け取ることができる

```
<Context.Provider value={…}>
  {children}
</Context.Provider>
```

また、Contextを使用できる範囲は、このContext.Providerの中の子コンポーネントでだけである

そして、valueに入れた値を使うことができる

主にこの3要素が必要になる

## fetchとpromise

fetchメソッドはそもそもpromiseを返す(待機中, 成功、失敗のいずれか)

thenを使うことで、ネストが深くならずに、直線的に処理できるため、可読性の高いコードに

Promiseを使用
```
  fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => setData(data))
```

Promiseを未使用(async関数とawait)
```
  const fetchData = async () => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    setData(data);
  };
  fetchData();
```

promiseオブジェクトを使うことで、順番にfetchなどの非同期処理ができる

[https://qiita.com/hisashi_matsui/items/d8457284e9219f57ca6c](https://qiita.com/hisashi_matsui/items/d8457284e9219f57ca6c)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install` ###
node_moduleなどのgitignoreで隠されるフォルダやファイルなどが
GitHubのリモートリポジトリにはない.

そのため, リモートリポジトリの内容をただ取り込むだけでは実行できないので,
`npm install`を実行することで, `package.json`に基づいた依存関係をインストール.

(依存関係 = 動作をする上で必要な外部ライブラリやモジュール)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# 参考文献

[https://qiita.com/hato_code/items/e75f215ef2d5191341dc](https://qiita.com/hato_code/items/e75f215ef2d5191341dc)

参考文献通り、まずjsとjsxで進め、次の段階にtsとtsxでの実装を試みる

[https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504](https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504)

propsとstate, 今後混同しそう
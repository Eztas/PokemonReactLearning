# Pokedex

[deploy結果](https://pokedex-app-6e3ac.web.app)

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

## コミットのリセット(commit記録上にも残らないようにする)

```
git branch backup-ブランチ名               # バックアップ用に新しいブランチを作成(backupコマンドやタグがあるわけではない)
git reset HEAD^1                          # 最新コミットをリセット
# ステージングとコミット
git push origin test_3_eslint --force     # リモートに反映(前のコミットを上書き)
```

これにより、例えば誤ってenvファイルの中身がリモートにプッシュされるようなことになった時、コミット記録上でも他人に見られないようにするのに、
これを用いることができる

```
reset: Git の履歴や状態を特定のポイントに戻す操作
HEAD: 今いる場所（現在のブランチの最新コミット）
^1: 「1つ前のコミット」
```
これで、HEADの一個前のブランチに戻りつつ、
HEADに元々プッシュされていた内容はステージング前の位置に戻る


# 記録
2025/02/28 スタート

2025/03/01 props, アロー関数, map

2025/03/02 useEffect, useState

2025/03/03~2025/03/04 useEffectを使っているのに、2回実行される問題に対応

2025/03/04 ポケモン情報追加機能, onclickの際の関数の扱い

2025/03/04~06 日本語対応, jsonデータの扱い

2025/03/06~07 デプロイ前のリファクタリング(useContextによるデータ共有, 日本語と英語版の実装, React Router)

2025/03/07~08 コンポーネント関数の共有化, 普通の関数と関数コンポーネントについて

2025/03/08 デプロイ

2025/03/10~29 テスト(jest), [https://qiita.com/yo16/items/d7dda9c8b496204fce82](https://qiita.com/yo16/items/d7dda9c8b496204fce82)

2025/03/11~12 エラー処理

2025/03/13~15 アクセス確認用ファイルの使用を構想 -> フロントエンドとバックエンドで各々のデプロイが必要そう(?)

2025/03/15~18 ファイル書き込みをやめ、Firebase Realtime Database使用の模索

->でもこれもデータベースが多数書き換えられる可能性

2025/03/18~23 ファイル書き込みをもう一度試すも失敗,
このreactでのプロジェクトでは行わず, Next.jsでの利用により模索する

2025/03/23~29 テストに向けてまずESLintの追加

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

また、propsにある関数を扱う際は一工夫がいる

引数がpropsと{props}で異なる

もし、onClick=propsのようなことをしたくて、
関数実行側でもMethod(props)としていても、
関数定義の際の仮引数の書き方で異なる

propsだと、デフォルトのprops配列の中にpropsという関数がある判定になる

呼び出しは、onClick={props.props}となる

{props}だと、props関数をそのまま利用できる

呼び出しは、onClick={props}となる

## constでやるのか, functionでやるのか

constとfunctionで違いはあまりない(?), 2025/03/07現在

ただの関数か関数コンポーネントかは、
useStateなどの状態管理やフックに関する内容を含み、
eactのUIを定義し、レンダリングされる要素を返すものを指す

つまり, 基本的にUIを返すものでないと、フックは使えない

## フック

関数のトップレベル(ループ、条件文など)で呼ばない

グローバルで呼ばない

普通の関数内で使う(関数コンポーネントでないもの, UIを返さないもの)と、Reactがフックの状態を追跡できなくなり、バグや予期しない動作を引き起こす可能性があるため

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

## React Router(BrowserRouter, Routes, Route, Link)

React Routerは、Reactにおいてシングルページアプリケーション（SPA）のルーティングを実現するための標準的なライブラリ

BrowserRouterでのオーバーラップが必要

BrowserRouterからのContextがLinkに必要である

BrowserRouterがProvider, 
Routes, RouteがcreateContext, 
LinkがuseContextに近い形で使用できる

親コンポーネントで、まず初期のページ遷移先,
次のページ遷移先を用意しておくことで、
子コンポーネントではLinkのみでページを移動が実装できる

## SPA(Single Page Application)
単一ページ中でコンテンツの切り替えを行うWebアプリケーション

これだと各ユーザーは独自のブラウザインスタンスを持ち、状態はそれぞれのブラウザ内でローカルに管理されるため、競合しない

Reactの状態管理（例：コンテキスト）はクライアントサイドで行われ、異なるユーザーの操作は互いに影響を与えない  

サーバーAPI（この場合pokeapi.co）は各リクエストを独立して処理し、クライアントの状態に影響を与えない

Aさんが状態Xをfalseからtrueにしたい時、
もし、Bさんも同じことをすれば、false->true->falseとなり、
Aさんがtrueの状態を受け取れない事態が起こると懸念していたが、
SPAによりクライアントごとに状態が独立しているから問題ない

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

## package.jsonとpackage-lock.json

package.json は依存関係の範囲を指定する

`npm install`を実行すればこのファイルを元に依存関係をインストール

- プロジェクト名、バージョン、説明：プロジェクトの基本情報。

- 依存関係：本番環境で必要なパッケージ（例: "react", "react-dom"）。

- 開発依存関係：開発時のみ必要なパッケージ（例: "eslint", "jest"）。

- スクリプト：npm run で実行可能なコマンド（例: "start", "build"）。

package-lock.json は正確なバージョンをロックして一貫性を保つ役割を果たす

`npm install`を実行すると生成される

`npm ci`で正確なバージョン関係のインストール、他者間での環境統一に役立つらしい

- インストールされたすべての依存関係とサブ依存関係の正確なバージョン。

- 依存関係ツリーのフラットな構造を保存し、インストール速度と信頼性を向上。

## ESLintとは

「どっちでも書ける記述方法のうちこっちにして」と決めたルールセットとそれに違反しているかどうかを自動検出(リント)・訂正(フォーマット)するツール

TypeScriptと組み合わせて型とかも検出・訂正できそう

人によってバラバラになってしまいがちな記述方式に一定の統一感を出せる

### ESLintのインストール
```
npm install eslint --save-dev
```

ESLintの設定
```
npx eslint --init
```

コマンド入力
```
Ok to proceed? (y) y

? How would you like to use ESLint? ... 
  To check syntax only
> To check syntax and find problems

? What type of modules does your project use? ... 
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? ... 
> React
  Vue.js
  None of these

? Does your project use TypeScript? ... 
> No
  Yes

? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node

eslint, globals, @eslint/js, eslint-plugin-react
? Would you like to install them now? » Yes  

? Which package manager do you want to use? ... 
> npm
  yarn
  pnpm
  bun
```

```
npm install eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

結局デフォルトだと、何もルールが設定できないようなので、この辺りも入れておくと良さそう

ReactはデフォルトでもESLintがあるため、
これを行っても完全には今回設定したESLintが反映されない可能性がある

そのため、node_modulesを削除して、一度依存関係をリセットしてから、
npm installを行い、今回の設定を反映させよう

参考文献

ESLint設定手順
[https://deku.posstree.com/react/eslint/](https://deku.posstree.com/react/eslint/)

ESLintの意義など
[https://zenn.dev/yhay81/articles/def73cf8a02864](https://zenn.dev/yhay81/articles/def73cf8a02864)

Reactのインポートに関する警告を除去するESLintについて
[https://qiita.com/Yasushi-Mo/items/c2e259f8e2a86b79cb8a](https://qiita.com/Yasushi-Mo/items/c2e259f8e2a86b79cb8a)

### files
ESLintがどのファイルに対して特定の設定を適用するかを定義

```
{ files: ["**/*.{js,mjs,cjs,jsx}"] }
```

### plugins
プラグインは、ESLintが標準でサポートしていないルールや機能を追加する

React, TypeScript, Vueなど特定フレームワーク用のプラグイン導入

```
import reactHooks from 'eslint-plugin-react-hooks';
plugins: {
  'react-hooks': reactHooks,
}
```

### extends
他の設定ファイルや共有設定からルールセットを継承
```
extends: ["js/recommended"]
```

### rules

コードの品質やスタイルに関する具体的なルールを設定

各ルールは「エラー」「警告」「無効化」などのレベルで制御
```
rules: {
  'react/prop-types': 'off', // PropTypesチェックを無効化
  'no-unused-vars': 'off', // 未使用変数の警告を無効化
  'react-hooks/exhaustive-deps': 'off', // useEffectの依存配列警告を無効化
}
```

### languageOptions
使用する言語仕様やグローバル変数など、コード環境に関するオプションを指定
JavaScriptのバージョンや、ブラウザ・Node.jsなどで利用可能なグローバル変数（例：window, process）などを設定

```
languageOptions: {
  globals: { ...globals.browser, ...globals.node }
}
```

### settings
ESLintのルール実行時に参照される共通の設定値を定義

プラグインやカスタムルールが利用するための設定値を格納

```
settings: {
  react: {
    version: "detect",
  },
}
```

## Prettier

フォーマッター

参考文献

[https://kamatimaru.hatenablog.com/entry/2021/01/04/141941](https://kamatimaru.hatenablog.com/entry/2021/01/04/141941)

## デプロイはbuildフォルダで

publicで行うと色々公開される可能性あり

参考文献のdeploy方法が色々合わなかったので、2025年版を表記

1. [Firebase公式サイト](https://firebase.google.com/?hl=ja)でプロジェクトを作成
ここは、[参考文献](https://qiita.com/hiroki-harada/items/ca22ac177db68e3c3796)を参考にして良さそう
(時々、ここにはないページもあったけど、普通に存在するボタンを押していけばOK)

2. 必要なパッケージのインストール

```
npm install --save firebase
npm install -g firebase-tools
```

3. `firebase login`で、Googleアカウントを選択する(webページに飛びます)

4. `npm run build`でbuildフォルダの作成

5. CLIでの手順(4と5は逆でもいいらしい)

```
firebase init
```

? Are you ready to proceed? (Y/n)でYを選択

( ) Hosting: Configure and deploy Firebase Hosting sites, これをスペースキー+Enterで選択

> Use an existing projectを選択して, 作成したプロジェクトを利用

```
? What do you want to use as your public directory? (public)
```

では、buildを入力(GitHubに上げている人とかはAPIキーなどを外部にさらすことになるかも)

```
 Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
```

これはNoでいい(SSRとかだとYesがいいらしい)

```
? Set up automatic builds and deploys with GitHub? (y/N) N
```

今はこんなのも聞かれるが、よく分からないし多分NoでOK

```
? File public/index.html already exists. Overwrite? (y/N)y
```

これもNo

buildはここで急造されたページなので、最新版の情報を入れておく

6. webページへ移動し、プロジェクト内でアプリを作成

ウェブアプリへのfirebaseの追加

このアプリの Firebase Hosting も設定します。はチェックしなくていい

アプリを登録

scriptタグのSDKを取得があるが、これまでにinstallしていて、それと重複する可能性があるからやめた方がいい

7. `firebase deploy`

すぐにはできないかも, 一回やっても表示されなくて、1時間くらいおいて再度deployしたらいけた

8. `firebase hosting:disable`

deployをやめたくなったら、これを実行

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

[https://qiita.com/hiroki-harada/items/ca22ac177db68e3c3796](https://qiita.com/hiroki-harada/items/ca22ac177db68e3c3796)

firebase デプロイ方法

[https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504](https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504)

propsとstate, 今後混同しそう

[https://zenn.dev/yumemi_inc/articles/2020-10-06-react-firebase-deploy](https://zenn.dev/yumemi_inc/articles/2020-10-06-react-firebase-deploy)

FireBaseデプロイで色々使える

[https://www.i-ryo.com/entry/2021/02/24/062009](https://www.i-ryo.com/entry/2021/02/24/062009)

[https://github.com/ryo-i/react-hook-test/tree/c9a5cab4bb18f531e9be2723ed2255a46b2a8d2c/src](https://github.com/ryo-i/react-hook-test/tree/c9a5cab4bb18f531e9be2723ed2255a46b2a8d2c/src)

Firebase read処理

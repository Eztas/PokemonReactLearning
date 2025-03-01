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

# 記録
2025/02/08 スタート

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
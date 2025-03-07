import {useState, createContext} from 'react';
export const PokemonContext = createContext();

// childrenにJapaneseAppなどの子コンポーネント関数が加えられる
function PokemonProvider({children}) {
    const LIMIT_NUMBER = 20; // パラメータにlimitを設定し、20件取得する
    
    // 各クライアントの状態は独立している理由: 各ユーザーは独自のブラウザインスタンスを持ち、状態はそれぞれのブラウザ内でローカルに管理されるため、競合しません。  
    // SPAの特性: シングルページアプリケーション（SPA）では、Reactの状態管理（例：コンテキスト）はクライアントサイドで行われ、異なるユーザーの操作は互いに影響を与えません。  
    // 予想外のポイント: サーバーAPI（この場合pokeapi.co）は各リクエストを独立して処理し、クライアントの状態に影響を与えないため、競合の心配がさらに減ります。

    // つまり、AさんとBさんがほぼ同時にもっと見るボタンを押して、
    // Aさん側のもっと見る実行(true)がBさんによって勝手にfalseになることも
    // Bさん側のもっと見る実行(true)がAさんによって勝手にfalseになることもない

    const [pokemons, setPokemons] = useState([]); // ポケモンのデータを格納する
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_NUMBER}`); // APIのURLを格納
    const [isReloading, setIsReloading] = useState(false);

    return (
        <PokemonContext.Provider value={{ pokemons, setPokemons, url, setUrl, isReloading, setIsReloading }}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider
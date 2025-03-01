import React from "react";

// アロー関数でコンポーネントを定義(一貫性などの観点, とりあえずアロー関数の方が良さそうくらいで今は良い)
// 本来はfunctionで定義する

// 親コンポーネントから子コンポーネントに引数などを介してデータを渡すための仕組み=propsの作成
// 親から引数でid, name, image, typeを受け取り、 それをポケモン1体の情報として表示する
const PokemonThumbnails = ({ id, name, image, type }) => {
  return (
    <div>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h4>{name}</h4>
        <h3>{type}</h3>
      </div>
    </div>
  );
};

// デフォルトエクスポートする
export default PokemonThumbnails;

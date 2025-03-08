import React from "react";

// アロー関数でコンポーネントを定義(一貫性などの観点, とりあえずアロー関数の方が良さそうくらいで今は良い)
// 本来はfunctionで定義する

// 親コンポーネントから子コンポーネントに引数などを介してデータを渡すための仕組み=propsの作成
// 親から引数でid, name, image, typeを受け取り、 それをポケモン1体の情報として表示する
const PokemonThumbnails = ({ id, name, iconImage, image, type, colorType }) => {
  const zeroPaddingNumber = 4;
  const idPad = id.toString().padStart(zeroPaddingNumber, "0")
  const thumbContainer = "thumb-container " + colorType;

  return (
    <div className={thumbContainer}>
      <div className="number">
        <small>#{idPad}</small>
      </div>
      <img src={iconImage} alt={name} className="icon-image" />
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

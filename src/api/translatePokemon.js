import pokemonNameJaEnJson from "./pokemonNameJaEn.json";
import pokemonTypeJson from "./pokemonType.json";

export const translatePokemon = (pokemonNameEn, pokemonTypeEn) => {
    const pokemonNameJa =   pokemonNameJaEnJson.find(
      (pokemonNameJaEn) => pokemonNameJaEn.en.toLowerCase() === pokemonNameEn
    )?.ja || pokemonNameEn; // ポケモンの日本語名が見つからない時は英語名でそのまま
    const pokemonTypeJa = pokemonTypeJson[pokemonTypeEn] ?? pokemonTypeEn; // ポケモンの日本語タイプ名が見つからない時は英語名でそのまま
    return {name: pokemonNameJa, type: pokemonTypeJa};
}
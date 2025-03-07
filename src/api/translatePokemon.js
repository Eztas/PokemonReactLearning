import pokemonNameJaEnJson from "./pokemonNameJaEn.json";
import pokemonTypeJson from "./pokemonType.json";

export const translatePokemon = (pokemonNameEn, pokemonTypeEn) => {
    const pokemonNameJa = pokemonNameJaEnJson.find(
      (pokemonNameJaEn) => pokemonNameJaEn.en.toLowerCase() === pokemonNameEn
    ).ja;
    const pokemonTypeJa = pokemonTypeJson[pokemonTypeEn];
    return {name: pokemonNameJa, type: pokemonTypeJa};
}
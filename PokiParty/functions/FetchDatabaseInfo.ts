import { NativeModules } from "react-native";

const { PokiPartyModule } = NativeModules;

export interface Party {
  id: string,
  pokeID1: string,
  pokeID2: string,
  pokeID3: string,
  pokeID4: string,
  pokeID5: string,
  pokeID6: string,
  teamName: string,
  userInfo: string
};

export interface Pokemon {
  id: number,
  imageURL: string,
  pokeID: number,
  pokeName: string,
  userInfo: string,
};

/**
 * 
 * @param userInfo User email
 * @returns Array of user party jsons from database
 */
export async function fetchTeams(userInfo: string): Promise<Party[]> {
  try {
    const teamsList = await PokiPartyModule.getAllTeams();

    // Assuming the result is a JSON string
    let teamsArray: Party[];
    try {
      teamsArray = JSON.parse(teamsList);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return [];
    }
    
    // If user has no teams, call populateTeam to give them an empty one
    if (teamsArray.length === 0) {
      await populateTeam(userInfo, 'dawgs');
      teamsArray = await fetchTeams(userInfo);
    }
    return teamsArray;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

/**
 * 
 * @param userInfo User email
 * @param teamName Team name
 */
export async function populateTeam(userInfo: string, teamName: string) {
  try {
    const result: string = await PokiPartyModule.insertNewTeam(userInfo, teamName);
    console.log('Insert team result:', result);
  } catch (error) {
    console.error('Error inserting team:', error);
  }
}

/**
 * 
 * @param userInfo User email
 * @returns Array of Pokemon jsons from database
 */
export async function fetchPokemon(userInfo: string): Promise<Pokemon[]> {
  try {
    const pokemonList = await PokiPartyModule.getPokemonByUserInfo(userInfo);

    let pokemonArray: Pokemon[];
    try {
      pokemonArray = JSON.parse(pokemonList);
    } catch (e) {
      console.error('Error parsing pokemon JSON: ', e);
      return [];
    }

    return pokemonArray;
  } catch (e) {
    console.error('Error fetching pokemon: ', e);
    return [];
  }
}

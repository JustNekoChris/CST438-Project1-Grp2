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
    // console.log(teamsArray);
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

export async function populateTeam(userInfo: string, teamName: string) {
  try {
    const result: string = await PokiPartyModule.insertNewTeam(userInfo, teamName);
    console.log('Insert team result:', result);
  } catch (error) {
    console.error('Error inserting team:', error);
  }
}

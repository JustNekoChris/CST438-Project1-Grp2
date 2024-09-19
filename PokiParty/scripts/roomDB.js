import { NativeModules } from 'react-native';
const { PokiPartyModule } = NativeModules;

// Inserting a team
PokiPartyModule.insertNewTeam('user1', 'MyTeam', 'poke1', 'poke2', 'poke3', 'poke4', 'poke5', 'poke6')
  .then((result) => {
    console.log(result); // Success message
  })
  .catch((error) => {
    console.error(error); // Error message
  });

// Fetching all teams
PokiPartyModule.getAllTeams()
  .then((teams) => {
    console.log(teams); // List of all teams
  })
  .catch((error) => {
    console.error(error); // Error message
  });
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { PokemonParty } from '@/components/PokemonParty';
import { fetchTeams, Party } from '@/functions/FetchTeams';
import { useSession } from '@/utils/DataContext';

// imports the main style sheet 
import { styles } from '../../assets/styles/mainStyleSheet';

// Other common assets
import { BasicBackButton } from '@/components/navigation/BackButton';

import { NativeModules } from 'react-native';
const { PokiPartyModule } = NativeModules;

export default function UserParties() {
  const [teams, setTeams] = useState<Party[]>([]); // State to store the list of teams
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState(-1);
  const [teamIndex, setTeamIndex] = useState(0);
  const [showTeams, setShowTeams] = useState(false);
  const {email} = useSession();

  // Will now load the teams when the app is loaded
  // Source: https://stackoverflow.com/questions/64945215/react-native-how-to-execute-function-every-time-when-i-open-page
  useEffect(() =>
  {
    fetchTeams(email!).then((result) => {
      setTeams(result);
    });
  }, [])
  
  useEffect(() => {
    if (teams.length > 0) {
      setTeamId(parseInt(teams[teamIndex].id));
      setTeamName(teams[teamIndex].teamName);
    }
    setShowTeams(teams.length > 0);
  }, [teams])

  /**
   * Inserts a new team to the database
   * @returns Nothing
   */
  const insertNewTeam = async () => {
    if (!teamName) {
      Alert.alert('Error', 'Please give the team a name');
      return;
    }
    try {
      const result: string = await PokiPartyModule.insertNewTeam(email, teamName);
      console.log('Insert team result:', result);
      setTeams(await fetchTeams(email!)); // Fetch teams after inserting a new one
      setTeamIndex(teamIndex + 1);
    } catch (error) {
      console.error('Error inserting team:', error);
    }
  };

  /**
   * Deletes a team from the database
   * @param teamId The string id of the team to delete
   */
  const deleteTeam = async () => {
    if (teams.length === 1) {
      Alert.alert('Cannot delete final team.');
      return;
    }
    try {  
      // Call a method on the native module to delete the team member
      await PokiPartyModule.deleteTeam(teamId);
  
      // Refresh the list after deletion
      setTeamIndex(teamIndex - 1);
      setTeams(await fetchTeams(email!));
    } catch (error) {
      console.error('Error deleting team member:', error);
      Alert.alert('Error', 'Failed to delete team member');
    }
  };

  /**
   * 
   * @returns Array of ids for the focused party
   */
  const getIds = () => {
    const ids: number[] = [];
    try {
      // Look for the focused team in teams array
      for (let i = 0; i < teams.length; i++) {
        if (parseInt(teams[i].id) === teamId) {
          // Push all ids into array
          ids.push(
            parseInt(teams[i].pokeID1),
            parseInt(teams[i].pokeID2),
            parseInt(teams[i].pokeID3),
            parseInt(teams[i].pokeID4),
            parseInt(teams[i].pokeID5),
            parseInt(teams[i].pokeID6)
          );
          break;
        }
      }
    } catch (error) {
      console.error('Error in getting the party\'s ids');
    }
    // Check that ids are numbers; set to 0 if not
    for (let i = 0; i < ids.length; i++) {
      if (isNaN(ids[i])) {
        ids[i] = 0;
      }
    }
    return ids;
  };

  return (
    <>
      {showTeams &&
        <View style={styles.container}>

          <View style={styles.header}>
            <Button title='Prev Team' onPress={() => deleteTeam()} />
            <Text>{teamName}</Text>
            <Button title='Next Team' onPress={() => deleteTeam()} />
          </View>
          
          <PokemonParty pokemonIds={getIds()} />
          
          <BasicBackButton/>

          <View style={styles.footer}>
            <Button color={'#660f22'} title='Delete Team' onPress={() => deleteTeam()} />
            <Button color={'#44db9f'} title='New Team' onPress={() => insertNewTeam()} />
          </View>
    
        </View>

      }
    </>
  );
};
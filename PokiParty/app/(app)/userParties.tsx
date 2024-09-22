import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { PokemonParty } from '@/components/PokemonParty';
import { fetchTeams, Party } from '@/functions/FetchDatabaseInfo';
import { useSession } from '@/utils/DataContext';

// imports the main style sheet 
import { styles } from '../../assets/styles/mainStyleSheet';

import { NativeModules } from 'react-native';
const { PokiPartyModule } = NativeModules;

export default function UserParties() {
  const [teams, setTeams] = useState<Party[]>([]); // State to store the list of teams
  const [teamName, setTeamName] = useState(''); // State to store focused team name
  const [teamId, setTeamId] = useState(-1); // State to store focused team id
  const [teamIndex, setTeamIndex] = useState(0); // State to store index of focused team
  const [showTeams, setShowTeams] = useState(false); // State to store flag that determines if team is displayed
  const [focused, setFocused] = useState(true); // State to store flag that determines if this page is focused
  const {email} = useSession();

  /**
   * Fetches teams from database whenever focus changes
   */
  useEffect(() => {
      fetchTeams(email!).then((result) => {
        setTeams(result);
      });
  }, [focused]);
  

  /**
   * Checks if there are teams to display, and sets necessary states
   */
  useEffect(() => {
    if (teams.length > 0 && teamIndex < teams.length) {
      setTeamId(parseInt(teams[teamIndex].id));
      setTeamName(teams[teamIndex].teamName);
    }
    setShowTeams(teams.length > 0);
  })


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
      setTeamIndex((teamIndex - 1) < 0 ? teams.length - 1 : teamIndex - 1);
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
      <Text testID='teamIndexText' disabled={true}>{teamIndex}</Text>
      {showTeams &&
        <View style={styles.container}>


          <View style={styles.header}>
            {/* Create a Button that decrements the counter, and wraps to the back */}
            <Button title='Prev Team' onPress={() => setTeamIndex((teamIndex - 1) < 0 ? teams.length - 1 : teamIndex - 1)} />
            <Text>{teamName}</Text>
            {/* Create a button that increments the counter, and wraps to the front */}
            <Button title='Next Team' onPress={() => setTeamIndex((teamIndex + 1) >= teams.length ? 0 : teamIndex + 1)} />
          </View>
          
          <PokemonParty
            pokemonIds={getIds()}
            teamId={teamId}
            userInfo={email!}
            setFocused={setFocused}
          />
          
          <Text>Tap pokemon to edit team</Text>

          <View style={styles.footer}>
            <Button color={'#660f22'} title='Delete Team' onPress={() => deleteTeam()} />
            <Button color={'#44db9f'} title='New Team' onPress={() => insertNewTeam()} />
          </View>
    
        </View>

      }
    </>
  );
};
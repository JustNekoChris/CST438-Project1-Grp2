import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, TextInput } from 'react-native';
import { NativeModules } from 'react-native';

// imports the main style sheet 
import { styles } from '../../assets/styles/mainStyleSheet';

// Other common assets
import { BasicBackButton } from '@/components/navigation/BackButton';

const { PokiPartyModule } = NativeModules;

const Team: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]); // State to store the list of teams
  const [teamName, setTeamName] = useState('');

  // Will now load the teams when the app is loaded
  // Source: https://stackoverflow.com/questions/64945215/react-native-how-to-execute-function-every-time-when-i-open-page
  useEffect(() =>
    {
       fetchAllTeams();
    }, [])

  // Function to insert a team
  const insertTeam = async () => {
    if (!teamName) {
      Alert.alert('Error', 'Please give the team a name');
      return;
    }
    try {
      const result = await PokiPartyModule.insertTeam('user1', teamName, 'poke1', 'poke2', 'poke3', 'poke4', 'poke5', 'poke6');
      console.log('Insert team result:', result);
      fetchAllTeams(); // Fetch teams after inserting a new one
    } catch (error) {
      console.error('Error inserting team:', error);
    }
  };

  // Function to fetch all teams
  const fetchAllTeams = async () => {
    try {
        const teamsList = await PokiPartyModule.getAllTeams();
        console.log('Fetched teams:', teamsList);

        // Assuming the result is a JSON string
        let teamsArray;
        if (typeof teamsList === 'string') {
            try {
                teamsArray = JSON.parse(teamsList);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                return;
            }
        } else {
            // If not a string, use it directly
            teamsArray = teamsList;
        }

        // Check if teamsArray is an array
        if (Array.isArray(teamsArray)) {
            setTeams(teamsArray);

            // will add a team to a users database if they have no teams set up
            // TO DO
            if (teamsArray) {

            }

        } else {
            console.error('Expected an array but got:', teamsArray);
        }
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
  };

  const deleteTeamMember = async (teamId: string) => {
    try {
      // Convert teamId from string to integer
      const teamIdInt = parseInt(teamId, 10);
  
      // Check if the conversion resulted in NaN
      if (isNaN(teamIdInt)) {
        throw new Error('Invalid team ID. Could not convert to a number.');
      }
  
      // Call a method on the native module to delete the team member
      await PokiPartyModule.deleteTeamMember(teamIdInt);
  
      // Refresh the list after deletion
      fetchAllTeams();
    } catch (error) {
      console.error('Error deleting team member:', error);
      Alert.alert('Error', 'Failed to delete team member');
    }
  };

  // Render item for FlatList
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.teamName}</Text>
      <Button title="Delete" onPress={() => deleteTeamMember(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTeamName}
        placeholder='Enter Team Name'
      />
      <Button title="Insert Team" onPress={insertTeam} />
  
      <FlatList
        data={teams}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Ensure 'id' is available and unique
        style={styles.list}
      />

      <BasicBackButton/>

    </View>
  );
};

export default Team;

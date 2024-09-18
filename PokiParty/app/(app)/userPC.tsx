import { Text, View, Button } from 'react-native';

// Needed for file navigation
import { router } from "expo-router";

// Basic style sheet
import { styles } from '@/assets/styles/mainStyleSheet';

// Other common assets
import { BasicBackButton } from '@/components/navigation/BackButton';

import { NativeModules } from 'react-native';
const { PokiPartyModule } = NativeModules;

import { useState } from 'react';

import { useSession } from '../../utils/DataContext';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

export default function userPC() {
  const [pokemon, setPokemon] = useState<any[]>([]); // store pokemon
  const {email} = useSession();

  const fetchPokemon = async () => {
    try {
      const pokemonList = await PokiPartyModule.getPokemonByUserInfo(email)
      console.log('Fetched pokemon:', pokemon);

      let teamPokemon;
        if (typeof pokemonList === 'string') {
            try {
                teamPokemon = JSON.parse(pokemonList);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                return;
            }
        } else {
            // If not a string, use it directly
            teamPokemon = pokemonList;
        }

        // Check if teamsArray is an array
        if (Array.isArray(teamPokemon)) {
          setPokemon(teamPokemon);

      } else {
          console.error('Expected an array but got:', teamPokemon);
      }
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
  };

   // Render item for FlatList
   const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.pokeName}</Text>
    </View>
  );

  // app layout!!!
  return (

    // Initial view block
    <View style={styles.container}>

      <BasicBackButton/>

      <FlatList
        data={pokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

    </View>
  );
}

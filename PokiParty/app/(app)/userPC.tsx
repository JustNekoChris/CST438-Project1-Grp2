import { Text, View, Button, Image } from 'react-native';

// Needed for file navigation
import { router } from "expo-router";

// Basic style sheet
import { styles } from '@/assets/styles/mainStyleSheet';

// Other common assets
import { BasicBackButton } from '@/components/navigation/BackButton';

import { NativeModules, FlatList } from 'react-native';
const { PokiPartyModule } = NativeModules;

import { useEffect, useState } from 'react';

import { useSession } from '../../utils/DataContext';

export default function UserPC() {
  const [pokemon, setPokemon] = useState<any[]>([]); // store pokemon
  const {email} = useSession();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const pokemonList = await PokiPartyModule.getPokemonByUserInfo(email);
      console.log(email);
      console.log('Fetched pokemon:', pokemonList);

      let pokemonJson;
      if (typeof pokemonList === 'string') {
          try {
              pokemonJson = JSON.parse(pokemonList);
              console.log('Parsed pokemon:', pokemonJson);
          } catch (e) {
              console.error('Error parsing JSON:', e);
              return;
          }
      } else {
          // If not a string, use it directly
          pokemonJson = pokemonList;
          console.log('Got pokemon:', pokemonJson);
      }

      // Check if pokemonArray is an array
      if (Array.isArray(pokemonJson)) {
        setPokemon(pokemonJson);
        console.log('Set pokemon:', pokemonJson);
      } else {
          console.error('Expected an array but got:', pokemonJson);
      }
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
  };

   // Render item for FlatList
   const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item} testID='pcPokemon'>
      <Image source={{ uri : item.imageURL }} style={{width: 80, height: 80}}/>
      <Text style={styles.itemText}>{item.pokeName}</Text>
    </View>
  );

  // app layout!!!
  return (

    // Initial view block
    <View style={[styles.container]}>
      <Text style={[styles.title, { fontSize: 24, marginBottom: 20, marginTop: 50 }]}>Your Pokemon Collection</Text>

      {/* FlatList to display the pokemon */}
      <FlatList
        data={pokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        numColumns={3}
      />

    </View>
  );
}
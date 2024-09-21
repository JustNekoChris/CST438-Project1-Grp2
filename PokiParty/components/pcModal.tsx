import { useState, useEffect } from 'react';
import { NativeModules, View, Text, ScrollView, SafeAreaView, Button } from 'react-native';
import { fetchPokemon, Pokemon } from '@/functions/FetchDatabaseInfo';
import { PokeIcon } from './pokemonIcon';
import { styles } from '@/assets/styles/mainStyleSheet';
import { router } from 'expo-router';

const { PokiPartyModule } = NativeModules;

interface PcInfo {
  userInfo: string,
  teamId: number,
  index: number,
};

/**
 * 
 * @param userInfo User email
 * @param teamId ID of focused party
 * @param index Index of pokemon that was pressed to arrive here
 * @returns A component that displays all the user's saved pokemon with the intention of adding one to the focused party
 */
export function PcModal({ userInfo, teamId, index }: PcInfo) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); // State to store pokemon retrieved from the database
  const [showPokemon, setShowPokemon] = useState(false); // State to store flag that shows user's pokemon

  /**
   * Retrieves user's pokemon on load
   */
  useEffect(() => {
    fetchPokemon(userInfo).then((result) => {
      setPokemon(result);
    });
  }, []);

  /**
   * Checks if there are pokemon to display, and sets necessary states
   */
  useEffect(() => {
    if (pokemon.length > 0) {
      setShowPokemon(true);
    }
  })

  /**
   *  Adds a pokemon to the current team, replacing the pokemon that was pressed
   * @param id ID of pokemon to add to the focused team at the focused index
   */
  const addPokemonToTeam = async (id: number) => {
    let rc = await PokiPartyModule.addTeamMemberAtIndex(teamId, id.toString(), index);
    console.log(rc);
    router.replace('/(app)/userParties');
  }

  return (
    <View style={styles.container}>
      <>
        {showPokemon ? (
          <>
            {pokemon.map((poke, index) => (
              <PokeIcon 
                key={poke.id}
                id={poke.pokeID}
                onPress={(id: number) => addPokemonToTeam(id)}
                width={150}
                height={150}
              />
            ))}
          </>
        )
          :
          <Text>
            User has no pokemon saved. Save pokemon to the PC to continue.
          </Text>
        }
      </>
    </View>
  );
}

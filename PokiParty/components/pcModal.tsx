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

export function PcModal({ userInfo, teamId, index }: PcInfo) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [showPokemon, setShowPokemon] = useState(false);

  useEffect(() => {
    fetchPokemon(userInfo).then((result) => {
      setPokemon(result);
    });
  }, []);

  useEffect(() => {
    if (pokemon.length > 0) {
      setShowPokemon(true);
    }
  })

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

import { useState, useEffect } from 'react';
import { NativeModules, View, Text } from 'react-native';

const { PokiPartyModule } = NativeModules;

export interface Pokemon {
  // do stuff here
}

interface PcInfo {
  userInfo: string
};

export function PcModal({ userInfo }: PcInfo) {
  const [pokemon, setPokemon] = useState<

  useEffect(() => {
    PokiPartyModule.getPokemonByUserInfo(userInfo);
  }, []);

  return (
    <View>
      <Text>
        User's pokemon here.
      </Text>
    </View>
  );
}

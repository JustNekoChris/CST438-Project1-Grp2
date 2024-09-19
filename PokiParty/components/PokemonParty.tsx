import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { PokeIcon } from './pokemonIcon';

import { styles } from '@/assets/styles/mainStyleSheet';

interface PartyProps {
  pokemonIds: Array<number>
}

export function PokemonParty({ pokemonIds }: PartyProps) {
  useEffect(() => {

  })

  return (
    <View style={styles.columns}> 

      <View style={styles.column}>
        <PokeIcon id={pokemonIds[0]} />
        <PokeIcon id={pokemonIds[2]} />
        <PokeIcon id={pokemonIds[4]} />
      </View>

      <View style={styles.column}>
        <PokeIcon id={pokemonIds[1]} />
        <PokeIcon id={pokemonIds[3]} />
        <PokeIcon id={pokemonIds[5]} />
      </View>

    </View>
  );
};

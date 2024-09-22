import { Image, View} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';

import { styles } from '@/assets/styles/searchPageStyleSheet';
import { UrlObject } from 'expo-router/build/LocationProvider';

// sets up a basic pokemon data type for front end data handling
// https://reactnative.dev/docs/intro-react
export type pokemonData = {
    pokemonName: String;
    pokemonURL: String;
    pokemonHeight: Number;
    stat1Name: String;
    stat1Val: Number;
    stat2Name: String;
    stat2Val: Number;
    stat3Name: String;
    stat3Val: Number;
    stat4Name: String;
    stat4Val: Number;
    stat5Name: String;
    stat5Val: Number;
    stat6Name: String;
    stat6Val: Number;
  };

// Base code to let users click on an image of a pokemon and have something happen
export function PokeStats ( temp : pokemonData ) {

    return <View> 
                <View style={styles.center}>
                    <ThemedText>{temp.pokemonName}</ThemedText>
                    <Image 
                        source={{uri : (temp.pokemonURL)}}
                        style={{width : 200, height : 200}}
                    />
                    <ThemedText> Height: {temp.pokemonHeight.toString()}</ThemedText>
                </View>
                <ThemedText style={styles.center} type="title">Base Stats</ThemedText>
                <View style={styles.rows}>
                    <ThemedText style={styles.statColumns}> {temp.stat1Name} : {temp.stat1Val.toString()} </ThemedText>
                    <ThemedText style={styles.statColumns}> {temp.stat2Name} : {temp.stat2Val.toString()} </ThemedText>
                    <ThemedText style={styles.statColumns}> {temp.stat3Name} : {temp.stat3Val.toString()} </ThemedText>
                </View>
                <View style={styles.rows}>
                    <ThemedText style={styles.statColumns}> {temp.stat4Name} : {temp.stat4Val.toString()} </ThemedText>
                    <ThemedText style={styles.statColumns}> {temp.stat5Name} : {temp.stat5Val.toString()} </ThemedText>
                    <ThemedText style={styles.statColumns}> {temp.stat6Name} : {temp.stat6Val.toString()} </ThemedText>
                </View>
        </View>

}


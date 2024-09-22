
// Using pressables as an alternative to fusing buttons and images through black magic
// Source: https://reactnative.dev/docs/pressable

// Other sources---
// https://reactnative.dev/docs/intro-react

import { Image, Pressable } from 'react-native';
import React from 'react';
import { router } from "expo-router";

// sets up a basic pokemon data type for front end data handling
// https://reactnative.dev/docs/intro-react
interface pokemonData {
    id: number,
    onPress: any,
    width: number,
    height: number,
  };

/**
 * 
 * @param id ID of pokemon to display in this icon
 * @param onPress Callback that the icon will call when pressed
 * @param width Width of icon
 * @param height Height of icon
 * @returns 
 */
export function PokeIcon ({ id, onPress, width, height } : pokemonData ) {
    if (id != 0 ) {

        return <Pressable testID='pokemonIcon' onPress={() => onPress(id)}>
        
            <Image
            source={{uri:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'}}
            style={{width: width, height: height}}
            />
    
        </Pressable>

    }
    else {

        // The system is currently hardcoded to use the subsitute image as a placeholder
        return <Pressable testID='pokemonIcon' onPress={() => onPress(id)}>

            <Image
            source={require('./../assets/images/plushSubsitute.jpg')}
            style={{width: width, height: height}}
            />

        </Pressable>
        
    }

}


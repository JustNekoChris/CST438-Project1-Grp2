
// Using pressables as an alternative to fusing buttons and images through black magic
// Source: https://reactnative.dev/docs/pressable

// Other sources---
// https://reactnative.dev/docs/intro-react

import { Image, Pressable } from 'react-native';
import React from 'react';
import { router } from "expo-router";

// sets up a basic pokemon data type for front end data handling
// https://reactnative.dev/docs/intro-react
export type pokemonData = {
    id: Number;
  };

// Testing function
const pressFunct = (val: Number) => {
    console.log(val)
}

// Base code to let users click on an image of a pokemon and have something happen
// TODO : Redirect to a specific pokemon page
export function PokeIcon ({ id } : pokemonData ) {

    // Handler function to call pressFunct with the id
    const handlePress = () => pressFunct(id);

    if (id != 0 ) {

        // The system is currently hardcoded to use the subsitute image as a placeholder
        return <Pressable onPress={handlePress}>
        
            <Image
            source={{uri:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}}
            style={{width: 200, height: 200}}
            />
    
        </Pressable>

    }
    else {

        // The system is currently hardcoded to use the subsitute image as a placeholder
        return <Pressable onPress={handlePress}>

            <Image
            source={require('./../assets/images/plushSubsitute.jpg')}
            style={{width: 200, height: 200}}
            />

        </Pressable>
        
    }

}


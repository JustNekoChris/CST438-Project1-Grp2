import { Button } from 'react-native';

import { NativeModules, FlatList } from 'react-native';
const { PokiPartyModule } = NativeModules;

import { useSession } from '../utils/DataContext';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

import { useEffect, useState } from 'react';

export default function AddOrRemoveButton({pokeID}: {pokeID: Double}) {
    const {email} = useSession();
    const [checkExists, setCheckExists] = useState<any[]>([]);

    // Check if a pokemon exists when the component is loaded
    useEffect(() => {
        checkPokemon()
    }, [])

    // Function to check if a pokemon exists
    const checkPokemon = async () => {
        try {
            const check = await PokiPartyModule.checkExistspokemon(email, pokeID);
            console.log(typeof check);
            console.log('Checked pokemon:', check);
            setCheckExists(check);
        } catch (error) {
            console.error('Error checking pokemon:', error);
        }
    }
    
    // Function to add a pokemon
    const addPokemonToPC = async () => {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokeID}/`
            let response = await fetch(url);
            let data = await response.json();
            await PokiPartyModule.insertPokemon(email, data["id"], data["name"], data["sprites"]["front_default"]);
            checkPokemon();
            console.log('Added pokemon:', data["name"]);
        } catch (error) {
            console.error('Error adding pokemon:', error);
        }
    }
    
    // Function to remove a pokemon
    const removePokemonFromPc = async () => {
        try {
            await PokiPartyModule.deletePokemon(email, pokeID);
            checkPokemon();
            console.log('Removed pokemon:', pokeID);
        } catch (error) {
            console.error('Error removing pokemon:', error);
        }
    };
        
    // Render the button based on if the pokemon exists
    if (checkExists) {
        return (
            <Button
            title="Remove from PC"
            onPress={async() => { removePokemonFromPc();}}
            />
        );
    } else {
        return (
            <Button
            title="Add to PC"
            onPress={async () => { addPokemonToPC(); await checkPokemon(); }}
            />
        );
    }
};
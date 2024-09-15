
// Using pressables as an alternative to fusing buttons and images through black magic
// Source: https://reactnative.dev/docs/pressable
import { Image, Pressable } from 'react-native';
import { router } from "expo-router";

// Testing function
// REMOVE LATER
function pressFunct() {
    console.log("pressed!")
}

// Base code to let users click on an image of a pokemon and have something happen
// TODO : Redirect to a specific pokemon page
export function PokeIcon ({}) {

    // The system is currently hardcoded to use the subsitute image as a placeholder
    return <Pressable onPress={pressFunct}>

        <Image
        source={require('./../assets/images/plushSubsitute.jpg')}
        style={{width: 400, height: 400}}
        />

    </Pressable>

}


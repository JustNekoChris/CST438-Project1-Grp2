import { Image, Button } from 'react-native';
import { router } from "expo-router";

export function PokeIcon ({}) {

    return <Image
                source={require('./../assets/images/plushSubsitute.jpg')}
                style={{width: 400, height: 400}}
            />

}
import { Text, View, Button } from 'react-native';

import { useSession } from '../../utils/DataContext';

// Needed for file navigation
import { router } from "expo-router";

// Basic style sheet
import { styles } from '@/assets/styles/mainStyleSheet';

// Other common assets
import { BasicBackButton } from '@/components/navigation/BackButton';
import { PokeIcon } from '@/components/pokemonIcon';

export default function pokedex() {
  const { signOut } = useSession();

  // app layout!!!
  return (

    // Initial view block
    <View style={styles.container}>

      < PokeIcon />
      < BasicBackButton/>

    </View>
  );
}

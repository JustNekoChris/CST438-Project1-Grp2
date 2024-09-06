import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, TextInput, Image, Platform, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    const search = async (pokemon : string) => {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }} >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Explore</ThemedText>
            </ThemedView>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="Search" onPress={() => search(searchQuery)} />
            </View>
        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
        width: '30%',
        alignSelf: 'center',
        borderWidth: 0,
        borderColor: 'transparent',
    },
    searchContainerFocused: {
        borderColor: 'transparent',
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    buttonContainer: {
        width: '40%', // Limit the width of the button to 40% of the screen width
        alignSelf: 'center', // Center the button on the screen
        marginTop: 10,
    },
  });
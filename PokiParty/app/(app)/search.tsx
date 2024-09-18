import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, TextInput, Image, Modal, Button, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Search() {
    const [searchBool, setSearchBool] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonTypeData, setPokemonTypeData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState('');

    const handlePress = async (pokemonName : string) => {
        searchByName(pokemonName);
        setSelectedPokemon(pokemonName);
        setModalVisible(true);
    };
    
    const toggleText = () => {
        setSearchBool(prevBool => !prevBool);
    };
    
    const onSearch = (input : string) => {
        if (!searchBool) {
            searchByName(input);
        } else {
            searchByType(input);
        }
    }

    const searchByName = async (pokemon : string) => {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        setPokemonData(data);
    }

    const searchByType = async (type : string) => {
        let url = `https://pokeapi.co/api/v2/type/${type}/`
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        setPokemonTypeData(data);
    }

    const printf = () => {
        console.log("glizzyy");
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }} 
            headerImage={<Ionicons size={310} name="search" style={styles.headerImage} />}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Pokedex</ThemedText>
            </ThemedView>

            {/* Search Bar */}
            <View style={styles.search}>
                <View style={styles.statColumns}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={searchBool ? 'fairy' : 'squirtle'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <View style={styles.statColumns}>
                    <Button title="Search" onPress={() => onSearch(searchQuery)} />
                </View>
            </View>

            {/* <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={searchBool ? 'fairy' : 'squirtle'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="Search" onPress={() => onSearch(searchQuery)} />
            </View> */}

            <View style={styles.buttonContainer}>
                <Button 
                    title={searchBool ? 'Search By Name' : 'Search By Type'} 
                    onPress={toggleText}/>
            </View>

            {!pokemonData ? (
                <ThemedText></ThemedText>
            ) : (
                <View>
                    <View style={styles.center}>
                        <ThemedText>{pokemonData["name"]}</ThemedText>
                        <Image 
                        source={{ uri : pokemonData["sprites"]["front_default"]}}
                        style={{width : 200, height : 200}}
                        />
                        <ThemedText> Height: {pokemonData["height"]}</ThemedText>
                    </View>
                    <ThemedText style={styles.center} type="title">Base Stats</ThemedText>
                    <View style={styles.rows}>
                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][0]["stat"]['name']} : {pokemonData["stats"][0]["base_stat"]} </ThemedText>
                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][1]["stat"]['name']} : {pokemonData["stats"][1]["base_stat"]} </ThemedText>
                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][2]["stat"]['name']} : {pokemonData["stats"][2]["base_stat"]} </ThemedText>
                    </View>
                    <View style={styles.rows}>
                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][3]["stat"]['name']} : {pokemonData["stats"][3]["base_stat"]} </ThemedText>
                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][4]["stat"]['name']} : {pokemonData["stats"][4]["base_stat"]} </ThemedText>
                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][5]["stat"]['name']} : {pokemonData["stats"][5]["base_stat"]} </ThemedText>
                    </View>
                </View>
            )}   

            {/* Render Pokemon Type data when searching by type */}
            {!pokemonTypeData ? (
                <ThemedText></ThemedText>
            ) : (
                <View style={styles.center}>
                    {
                        pokemonTypeData?.pokemon?.map((pokemonEntry, index) => (
                            <TouchableOpacity key={index} onPress={() =>  handlePress(pokemonEntry.pokemon.name)}>
                                <ThemedText style={styles.spaced}>{pokemonEntry.pokemon.name}</ThemedText>
                            </TouchableOpacity>
                        ))
                    }

                    {/* Modal Section */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <ThemedText style={styles.modalText}>You selected {selectedPokemon}!</ThemedText>
                                <View>
                                    <View style={styles.center}>
                                        <ThemedText>{pokemonData["name"]}</ThemedText>
                                        <Image 
                                        source={{ uri : pokemonData["sprites"]["front_default"]}}
                                        style={{width : 200, height : 200}}
                                        />
                                        <ThemedText> Height: {pokemonData["height"]}</ThemedText>
                                    </View>
                                    <ThemedText style={styles.center} type="title">Base Stats</ThemedText>
                                    <View style={styles.rows}>
                                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][0]["stat"]['name']} : {pokemonData["stats"][0]["base_stat"]} </ThemedText>
                                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][1]["stat"]['name']} : {pokemonData["stats"][1]["base_stat"]} </ThemedText>
                                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][2]["stat"]['name']} : {pokemonData["stats"][2]["base_stat"]} </ThemedText>
                                    </View>
                                    <View style={styles.rows}>
                                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][3]["stat"]['name']} : {pokemonData["stats"][3]["base_stat"]} </ThemedText>
                                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][4]["stat"]['name']} : {pokemonData["stats"][4]["base_stat"]} </ThemedText>
                                        <ThemedText style={styles.statColumns}> {pokemonData["stats"][5]["stat"]['name']} : {pokemonData["stats"][5]["base_stat"]} </ThemedText>
                                    </View>
                                </View>
                                <Button title="Back" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                </View>
            )}    
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
    buttonContainer: {
        alignItems: 'center',
        width: '100%'
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    statColumns: {
        flexDirection : 'column',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    rows: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    center: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: 20
    },
    spaced: {
        padding: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
    }
});

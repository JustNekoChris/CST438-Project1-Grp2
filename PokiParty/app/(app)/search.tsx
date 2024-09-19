import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BasicBackButton } from '@/components/navigation/BackButton';
import { StyleSheet, View, TextInput, Image, Modal, Button, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { NativeModules } from 'react-native';
const { PokiPartyModule } = NativeModules;

import { useSession } from '../../utils/DataContext';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import AddOrRemoveButton from '@/components/AddOrRemoveButton';

export default function Search() {
    const [searchBool, setSearchBool] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalData, setModalData] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonTypeData, setPokemonTypeData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const {email} = useSession();

    const handlePress = async (pokemonName : string) => {
        await getModalData(pokemonName);
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
        setPokemonData(data);
        setPokemonTypeData(null);
        setModalData(null)
    }

    const searchByType = async (type : string) => {
        let url = `https://pokeapi.co/api/v2/type/${type}/`
        let response = await fetch(url);
        let data = await response.json();
        setPokemonTypeData(data);
        setPokemonData(null);
        setModalData(null);
    }

    const getModalData = async (type : string) => {
        let url = `https://pokeapi.co/api/v2/pokemon/${type}/`
        let response = await fetch(url);
        let data = await response.json();
        console.log(data["name"]);
        setModalData(data);
        setPokemonData(null);
    }

    const addPokemonToPC = async (pokeID: Double, pokeName : string, imageURL: string) => {
        try {
            await PokiPartyModule.insertPokemon(email, pokeID, pokeName, imageURL);
            console.log('Added pokemon:', pokeName);
        } catch (error) {
            console.error('Error adding pokemon:', error);
        }
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

            <View style={styles.buttonContainer}>
                <Button 
                    title={searchBool ? 'Search By Name' : 'Search By Type'} 
                    onPress={toggleText}/>
            </View>

            {/* Search Result */}
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
                    <View style={styles.center}>
                        {/* new button that changes whther pokemon exists for user or not */}
                        <AddOrRemoveButton pokeID={pokemonData["id"]}/>
                        {/* <Button title='Add to Team' onPress={() => addPokemonToPC(pokemonData["id"], pokemonData["name"], pokemonData["sprites"]["front_default"])} /> */}
                    </View>
                </View>
            )}   

            {/* Search by Type results */}
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
                        {!modalData ? (
                            <ThemedText></ThemedText>
                        ) : (
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View>
                                        <View style={styles.center}>
                                            <ThemedText>{modalData["name"]}</ThemedText>
                                            <Image 
                                            source={{ uri : modalData["sprites"]["front_default"]}}
                                            style={{width : 200, height : 200}}
                                            />
                                            <ThemedText> Height: {modalData["height"]}</ThemedText>
                                        </View>
                                        <ThemedText style={styles.center} type="title">Base Stats</ThemedText>
                                        <View style={styles.rows}>
                                            <ThemedText style={styles.statColumns}> {modalData["stats"][0]["stat"]['name']} : {modalData["stats"][0]["base_stat"]} </ThemedText>
                                            <ThemedText style={styles.statColumns}> {modalData["stats"][1]["stat"]['name']} : {modalData["stats"][1]["base_stat"]} </ThemedText>
                                            <ThemedText style={styles.statColumns}> {modalData["stats"][2]["stat"]['name']} : {modalData["stats"][2]["base_stat"]} </ThemedText>
                                        </View>
                                        <View style={styles.rows}>
                                            <ThemedText style={styles.statColumns}> {modalData["stats"][3]["stat"]['name']} : {modalData["stats"][3]["base_stat"]} </ThemedText>
                                            <ThemedText style={styles.statColumns}> {modalData["stats"][4]["stat"]['name']} : {modalData["stats"][4]["base_stat"]} </ThemedText>
                                            <ThemedText style={styles.statColumns}> {modalData["stats"][5]["stat"]['name']} : {modalData["stats"][5]["base_stat"]} </ThemedText>
                                        </View>
                                    </View>
                                    <View style={styles.center, styles.rows}>
                                        <Button title="Back" onPress={() => setModalVisible(false)} />
                                        <AddOrRemoveButton pokeID={modalData["id"]}/>
                                        {/* <Button title='Add to Team' onPress={() => addPokemonToPC(modalData["id"], modalData["name"], modalData["sprites"]["front_default"])} /> */}
                                    </View>
                                </View>
                            </View>
                        )}
                    </Modal>
                </View>
            )}    
            <View style={styles.center}>
                <BasicBackButton/>  
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
    },
});
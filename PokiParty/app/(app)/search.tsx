import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BasicBackButton } from '@/components/navigation/BackButton';
import { StyleSheet, View, TextInput, Image, Modal, Button, TouchableOpacity, ImageBackground } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useSession } from '../../utils/DataContext';
import AddOrRemoveButton from '@/components/AddOrRemoveButton';
// Basic style sheet
// import { styles } from '@/assets/styles/searchPageStyleSheet';

export default function Search() {
    const [searchBool, setSearchBool] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalData, setModalData] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonTypeData, setPokemonTypeData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
        // console.log(data);
        setModalData(data);
        setPokemonData(null);
    }

    /* 
    * 
    * This function 'strips' another url, in order to find the location to the sprite using another repo
    *  
    * Base url : https://pokeapi.co/api/v2/pokemon/ {some number or whatnot} /
    * Returns : https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{some number or whatnot}.png
    * 
    * It returns an image link than can be displayed after using: uri:
    * 
    */
    const uriUrl = (s : string) =>{

        let portion = "";

        let start = 34;
        let count = start;

        while (s[count] != "/") {
            portion += s[count];
            count++;
        }

        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + portion + '.png';
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
                <View style={styles.container}>
                    {
                        pokemonTypeData?.pokemon?.map((pokemonEntry, index) => (
                            <TouchableOpacity key={index} onPress={() =>  handlePress(pokemonEntry.pokemon.name)}>

                                {/* Nested view in order to properly style the pokemon icons */}
                                <View style={styles.box}>
                                    {/* Image Background Documentation: https://reactnative.dev/docs/imagebackground */}
                                    <ImageBackground 
                                        source={require('./../../assets/images/blackCircle.png')}
                                        imageStyle={styles.boxedBackgroundImage}>
                                        
                                        {/* Attempted to use the plush as a failsafe, but it isn't working atm */}
                                        {/* Will put a fix in the uriUrl function */}

                                        <Image
                                            source={{uri:uriUrl(pokemonEntry.pokemon.url)}}
                                            defaultSource={require('./../../assets/images/plushSubsitute.jpg')}
                                            style={styles.boxedImage}
                                        />
                                    </ImageBackground>
                                </View>
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
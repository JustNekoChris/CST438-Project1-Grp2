import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BasicBackButton } from '@/components/navigation/BackButton';
import { StyleSheet, View, TextInput, Image, Modal, Button, TouchableOpacity, ImageBackground } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useSession } from '../../utils/DataContext';
import AddOrRemoveButton from '@/components/AddOrRemoveButton';
// Basic style sheet
import { styles } from '@/assets/styles/searchPageStyleSheet';

// Pokemon stat display component
import { PokeStats, pokemonData } from '@/components/pokemonStatsDisplay';

export default function Search() {
    const [searchBool, setSearchBool] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalData, setModalData] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonTypeData, setPokemonDataList] = useState(null);
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
        setPokemonDataList(null);
        setModalData(null)
    }

    const generalDisplay = async () => {
        let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`
        let response = await fetch(url);
        let data = await response.json();
        setPokemonDataList(data);
        console.log(data);
        setPokemonData(null);
        setModalData(null);
    }

    const searchByType = async (type : string) => {
        let url = `https://pokeapi.co/api/v2/type/${type}/`
        let response = await fetch(url);
        let data = await response.json();
        setPokemonDataList(data);
        console.log(data);
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

    useEffect(() => {
        generalDisplay();
      }, []);

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

                    <PokeStats 
                       pokemonName={    pokemonData["name"]} 
                       pokemonURL={     pokemonData["sprites"]["front_default"]}
                       pokemonHeight={  pokemonData["height"]}
                       stat1Name={      pokemonData["stats"][0]["stat"]['name']}
                       stat1Val={       pokemonData["stats"][0]["base_stat"]} 
                       stat2Name={      pokemonData["stats"][1]["stat"]['name']}
                       stat2Val={       pokemonData["stats"][1]["base_stat"]} 
                       stat3Name={      pokemonData["stats"][2]["stat"]['name']}
                       stat3Val={       pokemonData["stats"][2]["base_stat"]} 
                       stat4Name={      pokemonData["stats"][3]["stat"]['name']}
                       stat4Val={       pokemonData["stats"][3]["base_stat"]}
                       stat5Name={      pokemonData["stats"][4]["stat"]['name']}
                       stat5Val={       pokemonData["stats"][4]["base_stat"]}
                       stat6Name={      pokemonData["stats"][5]["stat"]['name']}
                       stat6Val={       pokemonData["stats"][5]["base_stat"]}
                    />

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
                                    <View style={styles.center}>
                                        <PokeStats 
                                           pokemonName={    modalData["name"]} 
                                           pokemonURL={     modalData["sprites"]["front_default"]}
                                           pokemonHeight={  modalData["height"]}
                                           stat1Name={      modalData["stats"][0]["stat"]['name']}
                                           stat1Val={       modalData["stats"][0]["base_stat"]} 
                                           stat2Name={      modalData["stats"][1]["stat"]['name']}
                                           stat2Val={       modalData["stats"][1]["base_stat"]} 
                                           stat3Name={      modalData["stats"][2]["stat"]['name']}
                                           stat3Val={       modalData["stats"][2]["base_stat"]} s
                                           stat4Name={      modalData["stats"][3]["stat"]['name']}
                                           stat4Val={       modalData["stats"][3]["base_stat"]}
                                           stat5Name={      modalData["stats"][4]["stat"]['name']}
                                           stat5Val={       modalData["stats"][4]["base_stat"]}
                                           stat6Name={      modalData["stats"][5]["stat"]['name']}
                                           stat6Val={       modalData["stats"][5]["base_stat"]}
                                        />
                                    </View>
                                    <View style={styles.rows}>
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

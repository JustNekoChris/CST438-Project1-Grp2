import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BasicBackButton } from '@/components/navigation/BackButton';
import { View, TextInput, Image, Modal, Button, TouchableOpacity, ImageBackground } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useSession } from '../../utils/DataContext';
import AddOrRemoveButton from '@/components/AddOrRemoveButton';
// Basic style sheet
import { styles } from '@/assets/styles/searchPageStyleSheet';
import { SearchByType } from '@/components/SearchByTypeView';
import { DataTable } from 'react-native-paper';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalData, setModalData] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonTypeData, setPokemonTypeData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [typeSearchVisible, setTypeSearchVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    const handlePress = async (pokemonName : string) => {
        await getModalData(pokemonName);
        setModalVisible(true);
    };
    
    const showModal = () => {
        setTypeSearchVisible(prevBool => !prevBool);
    };

    const handleTypeChange = (value : string) => {
        setSelectedType(value);
    };

    const searchByName = async (pokemon : string) => {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
        let response = await fetch(url);
        
        if (response["status"] == 404) {
            console.log("Not found");
            setErrorVisible(true);
            return;
        }

        let data = await response.json();
        setPokemonData(data);
        setPokemonTypeData(null);
        setModalData(null)
    }

    const searchByType = async (type : string) => {
        let url = `https://pokeapi.co/api/v2/type/${type}/`
        let response = await fetch(url);

        if (response["status"] == 404) {
            console.log("Not found");
            setErrorVisible(true);
            return;
        }

        let data = await response.json();
        setPokemonTypeData(data);
        setTypeSearchVisible(false);
        setPokemonData(null);
        setModalData(null);
    }

    const getModalData = async (type : string) => {
        let url = `https://pokeapi.co/api/v2/pokemon/${type}/`
        let response = await fetch(url);

        if (response["status"] == 404) {
            console.log("Not found");
            setErrorVisible(true);
            return;
        }

        let data = await response.json();
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
                        placeholder={'squirtle'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <View style={styles.statColumns}>
                    <Button title="Search" onPress={() => searchByName(searchQuery)} />
                </View>
            </View>

            {/* Search By Type button */}
            <View style={styles.buttonContainer}>
                <Button 
                    title={'Search By Type'} 
                    onPress={showModal}/>
            </View>

            {/* Search by Type Modal */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={typeSearchVisible}
                onRequestClose={() => {
                    setTypeSearchVisible(!typeSearchVisible)
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <SearchByType onValueChange={handleTypeChange}/>
                            
                        <View style={styles.rows}>
                            <View style={styles.statColumns}>
                                <Button title="Back" onPress={() => setTypeSearchVisible(false)} />
                            </View>
                            <View style={styles.statColumns}>
                                <Button title="Search" onPress={() => searchByType(selectedType)} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal for when no results are found */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={errorVisible}
                onRequestClose={() => {
                setModalVisible(!errorVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ThemedText style={styles.spacedDown}>Not Found</ThemedText>
                        <Button title="Back" onPress={() => setErrorVisible(false)} />
                    </View>
                </View>
            </Modal>

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
                        <ThemedText>Type(s):</ThemedText>
                        {pokemonData.types?.map((type, index) => (
                            <ThemedText>{type.type.name}</ThemedText>
                        ))}
                    </View>
                    <ThemedText style={styles.center} type="title">Base Stats</ThemedText>
                    
                    <DataTable>
                        {pokemonData.stats?.map((stat, index) => (
                        <DataTable.Row key={index} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                            <DataTable.Cell style={styles.statNameCell}>{stat.stat.name}</DataTable.Cell>
                            <DataTable.Cell style={styles.statValueCell} numeric>{stat.base_stat}</DataTable.Cell>
                        </DataTable.Row>
                        ))}
                    </DataTable>
                    
                    <View style={[styles.center, styles.spacedUp]}>
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
                                    <View style={styles.center}>
                                        <View style={styles.center}>
                                            <ThemedText>{modalData["name"]}</ThemedText>
                                            <Image 
                                            source={{ uri : modalData["sprites"]["front_default"]}}
                                            style={{width : 200, height : 200}}
                                            />
                                            <ThemedText> Height: {modalData["height"]}</ThemedText>
                                            <ThemedText>Type(s):</ThemedText>
                                            {modalData.types?.map((type, index) => (
                                                <ThemedText>{type.type.name}</ThemedText>
                                            ))}
                                        </View>
                                    </View>
                                    <View>
                                        <ThemedText style={styles.center} type="title">Base Stats</ThemedText>
                                
                                        <DataTable>
                                            {modalData.stats?.map((stat, index) => (
                                            <DataTable.Row key={index} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                                <DataTable.Cell style={styles.statNameCell}>{stat.stat.name}</DataTable.Cell>
                                                <DataTable.Cell style={styles.statValueCell} numeric>{stat.base_stat}</DataTable.Cell>
                                            </DataTable.Row>
                                            ))}
                                        </DataTable>
                                    </View>
                                    <View style={[styles.center, styles.rows]}>
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
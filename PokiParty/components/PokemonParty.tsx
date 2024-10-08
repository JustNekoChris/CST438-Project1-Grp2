import React, { useState, useEffect } from 'react';
import { View, Modal, SafeAreaView, ScrollView, Button, Text } from 'react-native';
import { PokeIcon } from './pokemonIcon';
import { PcModal } from './pcModal';
import { router } from 'expo-router';

import { styles } from '@/assets/styles/mainStyleSheet';

interface PartyProps {
  pokemonIds: Array<number>,
  teamId: number,
  userInfo: string,
  setFocused: any,
};

/**
 * 
 * @param pokemonIds Array of 6 pokemon to display in this party
 * @param teamId Id of the party to display
 * @param userInfo User email
 * @returns A component that will display 6 pokemon icon components in two columns
 */
export function PokemonParty({ pokemonIds, teamId, userInfo, setFocused }: PartyProps) {
  const [showModal, setShowModal] = useState(false); // State to store flag that shows modal
  const [index, setIndex] = useState(-1); // State to store the index of the pressed pokemon

  const setModalInfo = (i: number) => {
    setFocused(false);
    setIndex(i);
    setShowModal(true);
  }

  /**
   * Function to closeModal and setFocus back to userParties page
   */
  const closeModal = () => {
    setFocused(true);
    setShowModal(false);
  }

  return (
    <View style={styles.columns}> 

      {/* This modal will appear when a pokemon is pressed. */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          closeModal();
        }}>
        
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text>Select Pokemon from PC</Text>
              <PcModal 
                userInfo={userInfo}
                teamId={teamId}
                index={index}
                closeModal={closeModal}
              />
              <Button title='Cancel' onPress={() => closeModal()}></Button>
            </View>
          </ScrollView>
        </SafeAreaView>

      </Modal>

      {/* Create two columns of pokemon icons */}
      <View style={styles.column}>
        <PokeIcon
          id={pokemonIds[0]}
          onPress={(id: number) => setModalInfo(0)}
          width={200}
          height={200}
          />
        <PokeIcon
          id={pokemonIds[2]}
          onPress={(id: number) => setModalInfo(2)}
          width={200}
          height={200}
          />
        <PokeIcon
          id={pokemonIds[4]}
          onPress={(id: number) => setModalInfo(4)}
          width={200}
          height={200}
          />
      </View>

      <View style={styles.column}>
        <PokeIcon
          id={pokemonIds[1]}
          onPress={(id: number) => setModalInfo(1)}
          width={200}
          height={200}
          />
        <PokeIcon
          id={pokemonIds[3]}
          onPress={(id: number) => setModalInfo(3)}
          width={200}
          height={200}
          />
        <PokeIcon
          id={pokemonIds[5]}
          onPress={(id: number) => setModalInfo(5)}
          width={200}
          height={200}
        />
      </View>

    </View>
  );
};

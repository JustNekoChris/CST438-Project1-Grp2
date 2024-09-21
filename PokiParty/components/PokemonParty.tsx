import React, { useState, useEffect } from 'react';
import { View, Modal, SafeAreaView, ScrollView, Button } from 'react-native';
import { PokeIcon } from './pokemonIcon';
import { PcModal } from './pcModal';
import { router } from 'expo-router';

import { styles } from '@/assets/styles/mainStyleSheet';

interface PartyProps {
  pokemonIds: Array<number>,
  teamId: number,
  userInfo: string,
};

export function PokemonParty({ pokemonIds, teamId, userInfo }: PartyProps) {
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(-1);

  const setModalInfo = (i: number) => {
    setIndex(i);
    setShowModal(true);
  }

  return (
    <View style={styles.columns}> 

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <PcModal 
                userInfo={userInfo}
                teamId={teamId}
                index={index}
              />
              <Button title='Cancel' onPress={() => router.replace('/(app)/userParties')}></Button>
            </View>
          </ScrollView>
        </SafeAreaView>

      </Modal>

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

import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from '@/assets/styles/dropdownStyleSheet';
import DropDownPicker from 'react-native-dropdown-picker';

export function SearchByType({ onValueChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Normal', value: 'normal'},
    {label: 'Fire', value: 'fire'},
    {label: 'Water', value: 'water'},
    {label: 'Electric', value: 'electric'},
    {label: 'Grass', value: 'grass'},
    {label: 'Ice', value: 'ice'},
    {label: 'Fighting', value: 'fighting'},
    {label: 'Poison', value: 'poison'},
    {label: 'Ground', value: 'ground'},
    {label: 'Flying', value: 'flying'},
    {label: 'Psychic', value: 'psychic'},
    {label: 'Bug', value: 'bug'},
    {label: 'Rock', value: 'rock'},
    {label: 'Ghost', value: 'ghost'},
    {label: 'Dragon', value: 'dragon'},
    {label: 'Dark', value: 'dark'},
    {label: 'Steel', value: 'steel'},
    {label: 'Fairy', value: 'fairy'}
  ]);

  const handleValueChange = (selectedValue) => {
    setValue(selectedValue);
    if (onValueChange) {
      onValueChange(selectedValue); // Call the parent function
    }
  };

  return (
    <View style={[styles.width, styles.center]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleValueChange}
        setItems={setItems}
      />
    </View>
  );
};
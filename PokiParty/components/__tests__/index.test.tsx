import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import Search from '@/app/(app)';

// Note: import explicitly to use the types shipped with jest.
import {afterEach, describe, expect, it, jest} from '@jest/globals';

describe('index', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it(`renders correctly`, () => {
    render(<Search />);
  
    expect(screen).toBeTruthy();
  });

  it('displays search bar correctly', () => {
    render(<Search />);

    expect(screen.getByTestId('searchBar')).toBeTruthy();
  });

  it('renders pokemon when searched by name', async () => {
    const mockData = {
      id: 1,
      name: 'testPokemon',
      sprites: {
        front_default: 'https://test.com/image.png'
      },
      height: 10,
      types: [
        {
          slot: 1,
          type: {
            name: 'water',
          }
        }
      ],
      stats: [
        {
          base_stat: 100,
          stat: {
            name: 'hp',
          },
        }
      ]
    };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve(mockData),
      headers: new Headers(), // Mock the headers property as an empty Headers object
      text: () => Promise.resolve(JSON.stringify(mockData)), // Add text method to avoid errors
      redirected: false,
      url: 'https://pokeapi.co/api/v2/pokemon/testPokemon',
      type: 'basic',
      body: null,
      bodyUsed: false,
    } as Response));
    
    render(<Search />);
    
    fireEvent.changeText(screen.getByTestId('searchBar'), 'Test pokemon');
    fireEvent.press(screen.getByTestId('searchButton'));
    
    await waitFor(() => {
      expect(screen.getByText('testPokemon')).toBeTruthy();
    })
  });
  
  it('renders multiple pokemon when searched by type', async () => {
    const mockData = {
      pokemon: [
        {
          pokemon: {
            name: 'testPokemon1',
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          },
        },
        {
          pokemon: {
            name: 'testPokemon2',
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
          }
        }
      ]
    };
    
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve(mockData),
      headers: new Headers(), // Mock the headers property as an empty Headers object
      text: () => Promise.resolve(JSON.stringify(mockData)), // Add text method to avoid errors
      redirected: false,
      url: 'https://pokeapi.co/api/v2/type/testType/',
      type: 'basic',
      body: null,
      bodyUsed: false,
    } as Response));

    render(<Search />);

    fireEvent.press(screen.getByTestId('showTypeModalButton'));
    fireEvent.changeText(screen.getByTestId('dropDown'), 'onValueChange', 'fire');
    fireEvent.press(screen.getByTestId('searchTypeButton'));

    await waitFor(() => {
      expect(screen.getAllByTestId('searchPokemonImage')).toHaveLength(2);
    })
    
  });
})

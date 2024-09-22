import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import UserParties from '@/app/(app)/userParties';
import { PokemonParty } from '../PokemonParty';

// Note: import explicitly to use the types shipped with jest.
import {afterEach, describe, expect, it, jest} from '@jest/globals';

describe('userParties', () => {
  it('renders correctly', () => {
    render(<UserParties />);
  
    expect(screen).toBeTruthy();
  });

  it('renders 6 pokemon', async () => {
    render(<PokemonParty
        userInfo='silva.judah7@gmail.com'
        teamId={7}
        pokemonIds={[0, 1, 2, 3, 4, 5]}
        setFocused={() => null}
      />);

    await waitFor(() => {
      expect(screen.getAllByTestId('pokemonIcon')).toHaveLength(6);
    });
  });

  it('allows for cycling through parties', () => {
    render(<UserParties />);

    const indexText = screen.getByTestId('teamIndexText');
    expect(indexText.props.children).toBe(0);
  });

})

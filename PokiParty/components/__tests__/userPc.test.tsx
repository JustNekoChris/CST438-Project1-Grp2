import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

import UserPC from '@/app/(app)/userPC';

// Note: import explicitly to use the types shipped with jest.
import { describe, expect, it } from '@jest/globals';

describe('userPC', () => {
  it('renders correctly', () => {
    render(<UserPC />);
  
    expect(screen).toBeTruthy();
  });

  it('renders multiple pokemon', async () => {
    render(<UserPC />);

    await waitFor(() => {
      expect(screen.getAllByTestId('pcPokemon')).toHaveLength(8);
    });
  });

})

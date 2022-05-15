import React from 'react';

import {render} from '@testing-library/react-native';

import EmptyList from './index';

describe('SHOULD BE RENDER A EMPTY LIST COMPONENT', () => {
  it('Show text for emptylist  when is  not returned for then ', async () => {
    const {getByText} = render(<EmptyList />);

    expect(getByText(/pesquise/i));
  });
});

import React from 'react';
// import 'react-native-gesture-handler/jestSetup';
// import {Provider} from 'react-redux';
import {render} from '@testing-library/react-native';
// import {store, persistor} from '../src/redux-store/index';
// import {PersistGate} from 'redux-persist/integration/react';
// import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
import PageHeader from './index';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});
describe('SHOULD BE RENDER A PAGE COMPONENT', () => {
  it('Show Title of Page Header when is setted', async () => {
    const {findByText} = render(
      <PageHeader setTitle={'Favorites'} hiddenIconHamburger />,
    );
    expect(await findByText('Favorites')).toBeTruthy();
  });
});

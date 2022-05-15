import React from 'react';
// import 'react-native-gesture-handler/jestSetup';
// import {Provider} from 'react-redux';
import {render} from '@testing-library/react-native';
// import {store, persistor} from '../src/redux-store/index';
// import {PersistGate} from 'redux-persist/integration/react';
// import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
import CardBook from './index';

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
describe('SHOULD BE RENDER A CARD COMPONENT', () => {
  it('Show info cards when is setted', async () => {
    const imageTest =
      'https://images.unsplash.com/photo-1652632530241-faec6f6cca0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
    const {findByText} = render(
      <CardBook
        id={'1'}
        imageUrl={imageTest}
        title={'Title'}
        authors={['Author', 'Author2']}
        pageCount={'100'}
        publisher={'Editora 1'}
        published={'2020'}
        // object
      />,
    );

    // console.log('findByText');
    expect(await findByText('Author')).toBeTruthy();
  });
});

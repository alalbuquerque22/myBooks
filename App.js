import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/routes/routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux-store/index';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <>
            <StatusBar barStyle="auto" backgroundColor={'#acacac'} />
            <Routes />
          </>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

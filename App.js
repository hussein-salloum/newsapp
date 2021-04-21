import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import logger from './app/utility/logger';
import OfflineNotice from './app/components/OffileNotice';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux/store';
import CountryContext from './app/hooks/context';

logger.start();

export default function App() {
   const [countryCode, setCountryCode] = useState();
  return (
      <>
      <OfflineNotice />
      <CountryContext.Provider value={{ countryCode, setCountryCode }}>
      <NavigationContainer theme={navigationTheme}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
      </NavigationContainer>
      </CountryContext.Provider>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

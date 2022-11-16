/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { RootNavigator } from './navigation/RootNavigation';
import { store } from './store';

const App = () => {

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <RootNavigator />
      </View>
    </Provider>
  );
};

export default App;

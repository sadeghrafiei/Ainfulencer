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
import { RootNavigator } from './navigation/RootNavigation';

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <RootNavigator />
    </View>
  );
};

export default App;

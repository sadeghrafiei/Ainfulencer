import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from '../screens/SearchScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/selector/user';
import { getToken, tokenKey } from '../helpers/localStorage';
import useStorageValue from '../hooks/useStorageValue';

export type RootParamList = {
  search: undefined,
  login: undefined
}

const Stack = createStackNavigator<RootParamList>();

const RootStack = () => {
  const [token] = useStorageValue<string>(tokenKey);


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: false,
      }}
      initialRouteName={token ? "search" : "login"}
    >
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='search' component={SearchScreen} />
    </Stack.Navigator>
  );
};

export const RootNavigator = React.forwardRef<
  NavigationContainerRef<any>,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>(() => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';

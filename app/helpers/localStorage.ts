import AsyncStorage from '@react-native-async-storage/async-storage';

export const tokenKey = 'token';

export const getToken = (): Promise<string | null> => {
  return AsyncStorage.getItem(tokenKey);
};

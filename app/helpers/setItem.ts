import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async <T>(key: string, newValue: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(newValue));
};

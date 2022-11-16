import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStateStorage<V> = [value: V, setValue: (newValue: V) => Promise<void>];

export default function useStateStorage<V>(
  key: string,
  defaultValue: V,
): UseStateStorage<V> {
  const [value, setState] = useState<V>(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(store => {
      if (store != null) {
        try {
          setState(JSON.parse(store));
        } catch (err) {
          AsyncStorage.removeItem(key).then(() => {});
        }
      }
    });
  }, [key]);

  const setValue = useCallback(
    async (newValue: V) => {
      setState(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    },
    [key],
  );

  return [value, setValue];
}

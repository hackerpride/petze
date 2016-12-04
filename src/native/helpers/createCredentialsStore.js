import {AsyncStorage} from 'react-native';

export default function createCredentialsStore() {
  return {
    async get(key) {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    },
    async set(key, value) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    async remove(key) {
      await AsyncStorage.removeItem(key);
    }
  };
}

import { User } from '@react-native-google-signin/google-signin';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

export function getCurrentUserAsyncStorage() {
  const current = JSON.parse(storage.getString('user'));

  return current;
}

export function loginAsyncStorage(user: User) {
  storage.set('user', JSON.stringify(user));
}

export function logoutAsyncStorage() {

}

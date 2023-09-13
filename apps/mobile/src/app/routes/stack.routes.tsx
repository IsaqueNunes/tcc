import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import Login from '../pages/Login';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import LoggedRoutes from './LoggedRoutes';

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { navigate } = useNavigation<any>();
  useEffect(() => {
    async function verifyIfUserIsLogged() {
      const user = GoogleSignin.getCurrentUser();
      if (user) {
        navigate('logged')
        return;
      }
    }
    verifyIfUserIsLogged();
  }, []);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="logged" component={LoggedRoutes} />
    </Stack.Navigator>
  )
}

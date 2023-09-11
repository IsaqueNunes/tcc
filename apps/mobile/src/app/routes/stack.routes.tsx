import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateTicket from '../pages/CreateTicket';
import TicketList from '../components/TicketList';
import Home from '../pages/Home';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { STUDENT_EMAIL_VALID } from '../shared/util/constants';

import { View } from 'react-native';
import CustomDrawer from './CustonDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LoggedRoutes from './LoggedRoutes';
import useCurrentUser from '../hooks/useCurrentUser';
import { useUserContext } from '../context/UserContext';
import { getCurrentUserAsyncStorage } from '../storage/mmkv';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function StackRoutes() {
  const { getCurrentUser } = useUserContext();
  const currentUser = getCurrentUserAsyncStorage();
  const { navigate } = useNavigation<any>();
  useEffect(() => {
    async function verifyIfUserIsLogged() {
      if (currentUser) {
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

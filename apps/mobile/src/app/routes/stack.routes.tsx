import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from '../pages/Chat';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function StackRoutes() {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Logged" component={LoggedRoutes} />
    </Stack.Navigator>
  )
}

function LoggedRoutes() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator

      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <Icon style={{ paddingLeft: 10, color: 'black' }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            name="menu"
            size={30} />
        ),
      }}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen name="Dashboard" options={{ title: 'Dashboard' }} component={Dashboard} />
      <Drawer.Screen name="Home" options={{ title: 'Reclamações' }} component={Home} />
      <Drawer.Screen name="Chat" options={{ title: 'Mensagens' }} component={Chat} />
    </Drawer.Navigator>
  )
}

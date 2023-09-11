import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native';
import TicketList from '../../components/TicketList';
import Chat from '../../pages/Chat';
import CreateTicket from '../../pages/CreateTicket';
import Dashboard from '../../pages/Dashboard';
import Home from '../../pages/Home';
import { STUDENT_EMAIL_VALID } from '../../shared/util/constants';
import CustomDrawer from '../CustonDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useCurrentUser from '../../hooks/useCurrentUser';
import { TypeOfUser } from '../../models/enums/TypeOfUser';
import { useUserContext } from '../../context/UserContext';

const Drawer = createDrawerNavigator();

export default function LoggedRoutes() {
  const navigation = useNavigation();
  const { user } = useUserContext();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <Ionicons style={{ paddingLeft: 10, color: 'black' }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            name="menu"
            size={30} />
        ),
        drawerLabelStyle: {
          marginLeft: -25,
        },
        drawerInactiveTintColor: 'black'

      }}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={user.typeOfUser === TypeOfUser.CommonUser ? 'Home' : 'Dashboard'}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Início', drawerItemStyle: { display: user.typeOfUser === TypeOfUser.CommonUser ? 'flex' : 'none' },
          drawerIcon: ({ color }) => (<Ionicons name='home-outline' color={color} size={22} />)
        }}
        component={Home}
      />
      <Drawer.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard', drawerItemStyle: { display: user.typeOfUser === TypeOfUser.CommonUser ? 'none' : 'flex' },
          drawerIcon: ({ color }) => (<Feather name={'pie-chart'} color={color} size={22} />)
        }}
        component={Dashboard}
      />


      <Drawer.Screen
        name="TicketList"
        options={{
          title: 'Reclamações',
          drawerIcon: ({ color }) => (<Feather name='list' color={color} size={22} />)
        }}
        component={TicketList}
      />

      <Drawer.Screen
        name="Chat"
        options={{ title: 'Mensagens', drawerItemStyle: { display: 'none' } }}
        component={Chat}
      />

      <Drawer.Screen
        name="CreateTicket"
        options={{
          title: 'Criar Reclamação',
          drawerItemStyle: { display: user.typeOfUser === TypeOfUser.CommonUser ? 'flex' : 'none' },
          drawerIcon: ({ color }) => (<AntDesign name='form' color={color} size={22} />)
        }}
        component={CreateTicket}
      />

    </Drawer.Navigator>

  )
}

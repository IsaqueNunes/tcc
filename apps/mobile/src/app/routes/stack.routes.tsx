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
import { NX_REACT_GOOGLE_WEBCLIENT_ID } from '@env';
import { View } from 'react-native';
import CustomDrawer from './CustonDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function StackRoutes() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
  useEffect(() => {
    async function loadGoogleConfigs() {
      GoogleSignin.configure({
        webClientId: NX_REACT_GOOGLE_WEBCLIENT_ID,
        offlineAccess: true
      });
    }

    async function verifyIfUserIsLogged() {
      const currentUser: User = await GoogleSignin.getCurrentUser();
      const isUserLogged = currentUser !== null;
      setUserIsLogged(isUserLogged);
      setLoading(false);
    }

    loadGoogleConfigs();
    verifyIfUserIsLogged();
  }, []);

  return (
    !loading ? (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}
        initialRouteName={userIsLogged ? "Logged" : "Login"}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Logged" component={LoggedRoutes} />
      </Stack.Navigator>) :
      (
        <View />
      )
  )
}

function LoggedRoutes() {
  const navigation = useNavigation();
  const [isNormalUser, setIsNormalUser] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function identifyCurrentUser() {
      const user: User = await GoogleSignin.getCurrentUser();
      const isNormalUser = user.user.email.includes(STUDENT_EMAIL_VALID);
      setIsNormalUser(isNormalUser);
      setLoading(false);
    }

    identifyCurrentUser();
  }, [])

  return (
    !loading ? (
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerLeft: () => (
            <Icon style={{ paddingLeft: 10, color: 'black' }}
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
        initialRouteName={isNormalUser ? 'Home' : 'Dashboard'}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{
            title: 'Dashboard', drawerItemStyle: { display: isNormalUser ? 'none' : 'flex' },
            drawerIcon: ({ color }) => (<Feather name={'pie-chart'} color={color} size={22} />)
          }}
          component={Dashboard}
        />

        <Drawer.Screen
          name="Home"
          options={{
            title: 'Início', drawerItemStyle: { display: isNormalUser ? 'flex' : 'none' },
            drawerIcon: ({ color }) => (<Ionicons name='home-outline' color={color} size={22} />)
          }}
          component={Home}
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
            drawerIcon: ({ color }) => (<AntDesign name='form' color={color} size={22} />)
          }}
          component={CreateTicket}
        />

      </Drawer.Navigator>
    ) : (<View />)

  )
}

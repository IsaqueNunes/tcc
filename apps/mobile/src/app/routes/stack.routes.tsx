import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../pages/Chat';
import Login from '../pages/Login';

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}
      initialRouteName="Login"
    >
      <Screen name="Login" component={Login} />
      <Screen name="Chat" component={Chat} />
    </Navigator>
  )
}

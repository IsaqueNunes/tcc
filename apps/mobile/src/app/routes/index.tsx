import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from '../context/UserContext';

import { StackRoutes } from './stack.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <StackRoutes />
      </UserContextProvider>
    </NavigationContainer>
  )
}

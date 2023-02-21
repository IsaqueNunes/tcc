import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import UserHeader from './UserHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignOut from './SignOut';
import { style } from './styles';

export default function CustomDrawer(props: any) {
  const navigation = useNavigation<any>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [loadedUser, setLoadedUser] = useState<boolean>(false);

  useEffect(() => {
    async function getUser() {
      const user: User = await GoogleSignin.getCurrentUser();
      setCurrentUser(user);
      setLoadedUser(true);
    }

    getUser();
  }, [])

  return (
    loadedUser ? (<View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>

        <UserHeader currentUser={currentUser} />

        <DrawerItemList {...props} />

      </DrawerContentScrollView>
      <View style={style.bottomContainer}>

        <SignOut />

      </View>

    </View>) : (<View />)
  )
}

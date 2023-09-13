import { Alert, Text, TouchableOpacity } from 'react-native';
import { style } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { userIsValid } from '../../shared/util/validator';
import { useNavigation } from '@react-navigation/native';

export default function GoogleButton() {
  const navigation = useNavigation<any>();

  async function onLogin() {
    try {
      await GoogleSignin.hasPlayServices();
      const user: User = await GoogleSignin.signIn();
      const userValid = userIsValid(user);
      if (userValid.hasError) {
        Alert.alert(userValid.text);
        await GoogleSignin.signOut();
      } else {
        navigation.navigate('logged', { screen: userValid.text });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableOpacity style={style.buttonContainer} onPress={onLogin}>
      <Icon name={'google'} size={24} color={'black'} />
      <Text style={style.textButton}>Entrar com o google</Text>
    </TouchableOpacity>
  )
}

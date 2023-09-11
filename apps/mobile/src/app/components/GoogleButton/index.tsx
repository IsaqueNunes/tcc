import { Alert, Text, TouchableOpacity } from 'react-native';
import { style } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { userIsValid } from '../../shared/util/validator';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/UserContext';

export default function GoogleButton() {
  const navigation = useNavigation<any>();
  const { login } = useUserContext();

  async function onLogin() {
    try {
      await GoogleSignin.hasPlayServices();
      await login().then(async (response) => {
        const userValid = userIsValid(response);

        if (userValid.hasError) {
          Alert.alert(userValid.text);
          await GoogleSignin.signOut();
        } else {
          navigation.navigate('logged', { screen: userValid.text });
        }
      });
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

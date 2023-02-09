import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text, Alert } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { styles } from './styles';
import { commonStyles } from '../../styles/styles';
import { useNavigation } from "@react-navigation/native";
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";

export default function Login() {
  const [username, setUsername] = useState<FormValidatorDto>(new FormValidatorDto());
  const [password, setPassword] = useState<FormValidatorDto>(new FormValidatorDto());
  const navigator = useNavigation<any>();

  const validateLogin = () => {
    navigator.navigate('Logged', { screen: 'Dashboard' });
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.loginContainer}>
      <View style={styles.logoContainer}>

        <Logo />

      </View>
      <View style={styles.inputsContainer}>

        <Input label={"Nome de Usuário"} value={username} setValue={setUsername} />
        <Input label={"Senha"} value={password} setValue={setPassword} />

        <Button label={'Entrar'} onClick={validateLogin} />

        <Text style={commonStyles.textBlack}>Ou</Text>

      </View>
    </KeyboardAvoidingView>
  )
}

import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import { styles } from './styles';
import { commonStyles } from '../../styles/styles';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateLogin = () => {

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

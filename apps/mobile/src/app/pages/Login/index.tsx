import { useState } from "react";
import { View, Text, Alert, SafeAreaView } from "react-native";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import Separator from "../../components/Separator";
import GoogleButton from "../../components/GoogleButton";
import Link from "../../components/Link";

import { styles } from './styles';
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import { commonStyles } from "../../styles/styles";
import { useForm } from "react-hook-form";

export default function Login() {
  const [username, setUsername] = useState<FormValidatorDto>(new FormValidatorDto());
  const [password, setPassword] = useState<FormValidatorDto>(new FormValidatorDto());
  const { control } = useForm();

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.logoContainer}>

        <Logo />

      </View>

      <View style={styles.inputsContainer}>

        <Input label={"Nome de Usuário"} value={username} setValue={setUsername} control={control} id={"username"} />

        <View style={{ marginTop: 20 }} />

        <Input label={"Senha"} value={password} setValue={setPassword} control={control} id={"password"} />

        <Button onPress={() => Alert.alert('Funcionalidade em construção...')}>
          <Text style={commonStyles.text}>Entrar</Text>
        </Button>

        <Link label={"Esqueceu a senha?"} textColor={'#c4c4c4'} onClick={() => { }} />

        <Separator textInsideLines={"Ou"} />

        <GoogleButton />

        <View style={styles.textRegisterAccountContainer}>
          <Text style={styles.textRegisterAccount}>Não tem uma conta ainda?</Text>
          <Link label={"Cadastre-se."} onClick={() => { }} />
        </View>

      </View>
    </SafeAreaView>
  )
}

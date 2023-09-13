import { Prisma } from "@prisma/client";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, Alert } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { CreateTicketDto } from "../../models/CreateTicket/CreateTicketDto";
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import { postData } from "../../services/ApiService";
import { createErrorMessage } from "../../shared/util/validator";
import { commonStyles } from "../../styles/styles";

import { styles } from './styles';

export default function CreateTicket() {
  const [title, setTitle] = useState<FormValidatorDto>(new FormValidatorDto());
  const [content, setContent] = useState<FormValidatorDto>(new FormValidatorDto());
  const navigation = useNavigation();
  const [user, setUser] = useState<User>();
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    async function getCurrentLoggedUser() {
      const currentUser = await GoogleSignin.getCurrentUser();
      setUser(currentUser);
    }

    getCurrentLoggedUser();
  });

  const onSubmit = (data: any) => {
    console.log(data)
  }

  async function createTicket() {
    const inputsValidation = validateInputs();

    if (inputsValidation.allFieldsAreValid) {
      const ticket: CreateTicketDto = {
        title: title.value,
        content: content.value,
        email: user.user.email
      };

      await postData('/tickets', ticket);

      clearInputs();
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: 'TicketList' }]
      }))
      Alert.alert('Reclamação criada com sucesso.');
    } else {
      Alert.alert(inputsValidation.messageIfHasError);
    }
  }

  function clearInputs() {
    setTitle({ ...title, value: '', isValid: true });
    setContent({ ...content, value: '', isValid: true });
  }

  function validateInputs(): { allFieldsAreValid: boolean, messageIfHasError: string } {
    const titleIsNotEmpty = title.value !== '';
    const contentIsNotEmpty = content.value !== '';
    const allFieldsAreValid = titleIsNotEmpty && contentIsNotEmpty;

    setTitle({ ...title, isValid: titleIsNotEmpty });
    setContent({ ...content, isValid: contentIsNotEmpty });

    const messageIfHasError = createErrorMessage(
      [{ fieldName: 'título', fieldContent: title.value },
      { fieldName: 'conteúdo', fieldContent: content.value }]);

    return { allFieldsAreValid, messageIfHasError };
  }

  return (
    <View style={{ margin: 20 }}>
      <Text style={[commonStyles.textBlack, styles.titleText]}>Cadastrar</Text>

      <Input label={"Título"} value={title} setValue={setTitle} control={control} id={"title"} />

      <TextArea label={"Explique-nos o que aconteceu"} value={content} setValue={setContent} control={control} id={"content"} />

      <Button style={{ marginTop: 40 }} onPress={handleSubmit(onSubmit)}>
        <Text style={commonStyles.text}>Criar</Text>
      </Button>
    </View>
  )
}


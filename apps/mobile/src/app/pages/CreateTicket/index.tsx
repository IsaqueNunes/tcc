import { Prisma } from "@prisma/client";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Alert } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import { postData } from "../../services/ApiService";
import { createErrorMessage } from "../../shared/util/validator";
import { commonStyles } from "../../styles/styles";

import { styles } from './styles';

export default function CreateTicket() {
  const [title, setTitle] = useState<FormValidatorDto>(new FormValidatorDto());
  const [content, setContent] = useState<FormValidatorDto>(new FormValidatorDto());
  const navigation = useNavigation();

  async function createTicket() {
    const inputsValidation = validateInputs();

    if (inputsValidation.allFieldsAreValid) {
      const ticket: Prisma.TicketUncheckedCreateInput = {
        title: title.value,
        content: content.value,
        userId: '46ed718f-8030-4872-a8a6-8f2930ae35e9',
      };

      await postData('/tickets', ticket);

      clearInputs();
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }]
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
    <View style={{ margin: 40 }}>
      <Text style={[commonStyles.textBlack, styles.titleText]}>Cadastrar</Text>

      <Input label={"Título"} value={title} setValue={setTitle} />

      <TextArea label={"Explique-nos o que aconteceu"} value={content} setValue={setContent} />

      <Button label={"Criar"} margin={{ marginTop: 40 }} onClick={createTicket} />
    </View>
  )
}

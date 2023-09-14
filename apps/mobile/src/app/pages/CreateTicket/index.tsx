import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { FieldErrors, useForm } from "react-hook-form";
import { View, Text, Alert } from "react-native";
import { InferType } from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { CreateTicketDto } from "../../models/CreateTicket/CreateTicketDto";
import { postData } from "../../services/ApiService";
import { CreateTicketValidationSchema } from "../../shared/util/yupResolvers";
import { commonStyles } from "../../styles/styles";
import ErrorMessage from '../../components/ErrorMessage';

import { styles } from './styles';

type CreateTicketSchemaType = InferType<typeof CreateTicketValidationSchema>;

export default function CreateTicket() {
  const navigation = useNavigation();
  const { control, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm<CreateTicketSchemaType>({
    resolver: yupResolver(CreateTicketValidationSchema)
  });

  const onError = (errors: FieldErrors<CreateTicketSchemaType>) => {
    console.log(errors);
  }

  async function onSubmit(data: CreateTicketSchemaType) {
    const ticket: CreateTicketDto = {
      title: data.title,
      content: data.content,
      email: 'rafael.veiga@estudante.ifms.edu.br'
    };
    // implementation error

    await postData('/tickets', ticket);

    clearInputs();
    navigateToTicketList();
  }

  function clearInputs() {
    clearErrors("root");
    setValue("title", "")
    setValue("content", "")
  }

  function navigateToTicketList() {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'TicketList' }]
    }));
  }

  return (
    <View style={{ margin: 20 }}>
      <Text style={[commonStyles.textBlack, styles.titleText]}>Cadastrar</Text>

      <View style={{ marginVertical: 5 }}>
        <Input label={"Título"} control={control} id={"title"} error={errors?.title !== undefined} />
        {errors?.title && (
          <ErrorMessage message={errors.title.message} />
        )}
      </View>

      <View style={{ marginVertical: 5 }}>
        <TextArea label={"Explique-nos o que aconteceu"} control={control} id={"content"} errors={errors?.content !== undefined} />
        {errors?.content && (
          <ErrorMessage message={errors.content.message} />
        )}
      </View>

      <Button style={{ marginTop: 40 }} onPress={handleSubmit(onSubmit, onError)}>
        <Text style={commonStyles.text}>Criar</Text>
      </Button>
    </View>
  )
}


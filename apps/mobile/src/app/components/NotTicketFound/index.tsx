import { View, Text } from 'react-native'
import React from 'react'
import Button from '../Button'
import { common } from '../../pages/Home/styles'
import styles from './styles'
import { commonStyles } from '../../styles/styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'

export default function NotFoundTicket() {
  const navigation = useNavigation<any>();
  function onCreateNewTicket() {
    navigation.navigate('CreateTicket');
  }

  return (
    <View>
      <Text style={common.size12}>Nenhuma reclamação comentada ainda</Text>

      <Text style={styles.createNewTicketMessage}>Deseja criar uma reclamação?</Text>

      <Button onPress={onCreateNewTicket}>
        <Text style={commonStyles.text}>Criar</Text>
        <AntDesign name="arrowright" size={24} />
      </Button>
    </View>
  )
}

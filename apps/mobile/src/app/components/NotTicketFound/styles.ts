import { StyleSheet } from 'react-native'
import { common } from '../../pages/Home/styles';

const styles = StyleSheet.create({
  createNewTicketMessage: {
    ...common.size12,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  }
})

export default styles;

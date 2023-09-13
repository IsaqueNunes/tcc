import { View, Text } from 'react-native'
import styles from './style'

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <Text style={styles.textError}>
      {message}
    </Text>
  )
}

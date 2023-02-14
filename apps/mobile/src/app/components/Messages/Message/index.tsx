import { View, Text } from 'react-native'
import { convertDate } from '../../../shared/util/validator'
import { commonStyles } from '../../../styles/styles'
import { style } from './styles'

export type MessageProps = {
  username: string,
  email: string,
  data: string,
  content: string,
  isMainMessage?: boolean
}

export default function Message({ username, email, data, content, isMainMessage = false }: MessageProps) {
  return (
    <View style={isMainMessage ? style.ticketContentMessageContainer : style.ticketLowerMessageContainer}>
      <View>
        <Text numberOfLines={2} style={isMainMessage ? style.username : [style.username, { fontSize: 14 }]}>{username}</Text>
        <Text numberOfLines={2} style={isMainMessage ? style.email : { fontSize: 12 }}>{email}</Text>
        <Text style={isMainMessage ? style.data : { fontSize: 10 }}>{data && convertDate(data)}</Text>
      </View>
      <View style={style.ticketContentContainer}>
        <Text style={isMainMessage ? style.message : [style.message, { fontSize: 13, fontWeight: 'normal' }]}>
          {content}
        </Text>
      </View>
    </View>
  )
}

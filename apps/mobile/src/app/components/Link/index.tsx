import { TouchableOpacity, Text } from "react-native"
import { style } from "./styles"

type Props = {
  label: string,
  textColor?: string,
  onClick: () => void
}

export default function Link({ label, textColor = 'black', onClick }: Props) {
  return (
    <TouchableOpacity style={style.textContainer} onPress={onClick}>
      <Text style={[style.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  )
}

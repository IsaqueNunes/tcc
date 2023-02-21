import { TouchableOpacity, Text } from "react-native"
import { style } from "./styles"

type Props = {
  label: string,
  textColor?: string,
  navigateTo?: string
}

export default function Link({ label, textColor = 'black' }: Props) {
  return (
    <TouchableOpacity style={style.textContainer}>
      <Text style={[style.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  )
}

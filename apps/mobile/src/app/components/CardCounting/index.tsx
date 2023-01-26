import { View, Text, TouchableOpacity } from "react-native";
import { style } from './styles';

type Props = {
  label: string,
  counting: number
}

export default function CardCounting({ label, counting }: Props) {
  return (
    <TouchableOpacity style={style.cardContainer}>
      <Text style={style.label}>{label}</Text>
      <Text style={style.counting}>{counting.toString()}</Text>
    </TouchableOpacity>
  )
}

import { View, Text } from "react-native"
import { styles } from "./styles"

type Props = {
  textInsideLines: string,
}

export default function Separator({ textInsideLines }: Props) {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.line} />
      <View>
        <Text style={styles.textInsideLines}>{textInsideLines}</Text>
      </View>
      <View style={styles.line} />
    </View>
  )
}

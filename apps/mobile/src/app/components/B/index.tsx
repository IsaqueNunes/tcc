import { ReactNode } from "react"
import { Text } from "react-native"

type Props = {
  children: ReactNode
}

export default function B({ children }: Props) {
  return (
    <Text style={{ fontWeight: 'bold', color: 'black' }}>{children}</Text>
  )
}

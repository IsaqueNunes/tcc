import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from "./styles";

type Props = {
  label: string,
  onClick?: () => void,
  backgroundColor?: string,
  icon?: string,
  onlyIcon?: boolean,
  width?: string,
  navigation?: string,
  margin?: {}
}

export default function Button({
  label,
  onClick,
  navigation = '',
  icon = '',
  onlyIcon = false,
  backgroundColor = 'black',
  width = '100%',
  margin = {}
}: Props) {
  const style = styles(backgroundColor, width, onlyIcon, margin);
  const navigate = useNavigation<any>();
  // const buttonStyle = {
  //   'default': style.buttonContainer,
  //   'blue': {},
  //   'red': {}
  // }

  return (
    <TouchableOpacity style={style.buttonContainer} onPress={navigation ? navigate.navigate(navigation) : onClick}>
      {icon &&
        <Icon name={icon} size={24} color="black" />
      }
      {!onlyIcon &&
        <Text style={style.text}>{label}</Text>
      }
    </TouchableOpacity>
  )
}

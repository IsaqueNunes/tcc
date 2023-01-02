import DefaultImage from '../../shared/ifms_logo.png';
import { ImageSourcePropType } from 'react-native';
import { Image } from "react-native";

type Data = {
  image: ImageSourcePropType
}
const data: Data = {
  image: DefaultImage
}

export default function Logo() {
  return (
    <Image
      style={{ height: 200, width: 200 }}
      source={data.image}
    />
  );
}

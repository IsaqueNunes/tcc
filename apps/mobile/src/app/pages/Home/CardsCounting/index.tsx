import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CardCounting from "../../../components/CardCounting";
import { DropdownDto } from "../../../models/DropdownDto";

type Props = {
  countingData: DropdownDto[]
}

export default function CardsCounting({ countingData }: Props) {

  const renderItem = ({ item, index }) => (
    <CardCounting key={index} label={item.label} counting={item.value} />
  );

  return (
    <FlatList
      data={countingData}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
    />
  )
}

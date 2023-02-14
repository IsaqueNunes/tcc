import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CardCounting from "../../../components/CardCounting";

export default function CardsCounting() {
  const data = [{ label: 'Criadas', counting: 0 }, { label: 'Resolvidas', counting: 0 }, { label: 'Em Progresso', counting: 0 }, { label: 'Finalizadas', counting: 0 }]

  const renderItem = ({ item, index }) => (
    <CardCounting key={index} label={item.label} counting={item.counting} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
    />
  )
}

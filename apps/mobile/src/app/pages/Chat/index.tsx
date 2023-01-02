import React, { memo, useMemo, useEffect, useState } from 'react';
import {
  FlatList,
  Text, View
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import Input from '../../components/Input';

export default function Chat() {

  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  // const navigator = useNavigation();

  const Item = ({ title }: any) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: any) => (
    <Item title={item} />
  );


  return (
    <View style={styles.mainContent}>
      <Input value={text} setValue={setText} label={''} />
      <FlatList data={messages} renderItem={renderItem} />
    </View>
  )
}

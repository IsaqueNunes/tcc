import { useEffect, useState } from "react"
import DropDownPicker from "react-native-dropdown-picker"

type Props = {
  items: any[],
  value: string,
  setValue: (value: string) => void
}

export default function Select({ items, value }: Props) {
  const [open, setOpen] = useState<boolean>();
  const [itemsUpdated, setItems] = useState<any>(items);
  const [valueUpdated, setValue] = useState<string>(value);

  useEffect(() => {
    setValue(value);
  }, [value])

  return (
    <DropDownPicker
      open={open}
      value={valueUpdated}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={''}
      zIndex={1000}
      containerStyle={{ width: '100%' }}
    />
  )
}

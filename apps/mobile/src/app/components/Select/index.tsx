import { useEffect, useState } from "react"
import { Control, useController } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker"

type Props = {
  items: any[],
  name: string,
  defaultValue?: string
  control: Control,
  error?: boolean
}

export default function Select({ items, name, defaultValue, control, error = false }: Props) {
  const [open, setOpen] = useState<boolean>();

  const { field } = useController({
    name,
    defaultValue,
    control
  })

  function test(value: any) {
    const name = value();
    field.onChange(name);
  }

  return (
    <DropDownPicker
      open={open}
      value={field.value}
      items={items}
      setOpen={setOpen}
      setValue={test}
      setItems={() => { }}
      placeholder="Escolha um filtro"
      zIndex={1000}
      containerStyle={{ width: '75%', marginBottom: 5 }}
      style={{ borderColor: error ? 'red' : 'black' }}
    />
  )
}

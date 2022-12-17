import './input.css';

type Props = {
    value: string,
    onChange: (value: string) => void,
    placeholder?: string;
}

export default function Input({onChange, value, placeholder = ''}: Props)  {
    return (
        <input
            type="search"
            placeholder={placeholder}
            className="input-search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
    )
}

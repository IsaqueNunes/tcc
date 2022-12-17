import './text-area.css'

type Props = {
    value: string,
    onChange: (event: any) => void,

}

export default function TextArea({onChange, value}: Props) {
    return(
        <textarea
            name="message"
            id="message"
            aria-label="message-send-content"
            onChange={(event) => onChange(event.target.value)}
            value={value}
        />
    )
}

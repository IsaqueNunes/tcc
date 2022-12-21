import './divider.css';

type Props = {
  content: string
}

export default function Divider({ content }: Props) {
  return (
    <div className="divider">{content}</div>
  )
}

import './inputs.css'

export default function Inputs() {
  return (
    <div className="input-controller">
      <input className="input-style" autoFocus type="text" placeholder="Cpf/E-mail" />
      <input className="input-style" type="text" placeholder="Senha" />
    </div>
  )
}

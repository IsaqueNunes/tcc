/* eslint-disable react/button-has-type */ // ver depois como resolver isso
import './button.css';

type ButtonType = JSX.IntrinsicElements['button']['type'];

type ButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: ButtonType;
  buttonClassStyle: string;
};

export default function Button({
  label, onClick, type, buttonClassStyle,
}: ButtonProps) {
  return (
    <button id="button" className={buttonClassStyle} onClick={onClick} type={type}>{label}</button>
  );
}

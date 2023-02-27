import { DropdownDto } from 'libs/models/dropdown-dto';
import './select.css'

type Props = {
  selectedOption: string;
  setSelectedOptionSelect: (event: any) => void;
  options: DropdownDto[];
}

export default function Select({ selectedOption, setSelectedOptionSelect, options }: Props) {
  return (
    <select
      name="filter"
      value={selectedOption}
      onChange={setSelectedOptionSelect}
      className="filter-button"
      aria-label="State"
    >
      {options.map((option: DropdownDto, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

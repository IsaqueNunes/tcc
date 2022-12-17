import { DropdownDto }  from 'libs/models/dropdown-dto';
import './select.css'

type Props = {
    selectedOption: string;
    setSelectedOptionSelect: (event: any) => void;
    options: DropdownDto[];
}

export default function Select({selectedOption, setSelectedOptionSelect, options}: Props) {
    return(
        <select
              name="filter"
              value={selectedOption}
              onChange={setSelectedOptionSelect}
              className="filter-button"
              aria-label="State"
              id="filter-options"
            >
            {options.map((option: DropdownDto) => (
              <option value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

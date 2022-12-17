import './search-button.css';
import Image from '../Image';

type Props = {
    onClick: () => void
}

export default function SearchButton({onClick}: Props) {
    return(
        <div className="search-button" onClick={onClick} role="button" aria-hidden="true">
              <Image source="search.svg" width="20" height="20" nameLazyLoad="search icon" />
        </div>
    );
}

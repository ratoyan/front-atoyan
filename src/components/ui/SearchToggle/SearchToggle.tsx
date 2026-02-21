import {type FC, useRef, useEffect, useState} from "react";

// images
import SearchIcon from "../../../assets/images/search.svg";

// styles
import "./SearchToggle.css";

interface SearchProps {
    value: string;
    setValue: (val: string) => void;
}

const SearchToggle: FC<SearchProps> = ({value, setValue}: SearchProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    return (
        <div className="searchWrapper">
            <img
                src={SearchIcon}
                alt="Search"
                className="searchIcon"
                onClick={() => setIsOpen(true)}
            />

                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => setIsOpen(false)}
                    placeholder="Search..."
                    className={`searchInput ${isOpen ? "open" : ""}`}
                />
        </div>
    );
};

export default SearchToggle;

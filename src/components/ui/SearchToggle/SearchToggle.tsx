import * as React from "react";
import { type FC, useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// images
import SearchIcon from "../../../assets/images/search.svg";
import Close from "../../../assets/images/close.svg";

// styles
import "./SearchToggle.css";

interface SearchProps {
    value: string;
    setValue: (val: string) => void;
}

const SearchToggle: FC<SearchProps> = ({ value, setValue }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const query = searchParams.get("search");
        if (query) {
            setValue(query);
            setIsOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (value.trim()) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    }, [value, setSearchParams]);

    const handleIconClick = () => {
        if (value.trim()) {
            setValue("");
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <div className="searchWrapper">
            <img
                src={value.trim() ? Close : SearchIcon}
                alt={value.trim() ? "Clear search" : "Open search"}
                className={`searchIcon ${value.trim() ? "closeIcon" : ""}`}
                onClick={handleIconClick}
            />

            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                }
                onBlur={() => {
                    if (!value.trim()) {
                        setIsOpen(false);
                    }
                }}
                placeholder="Search..."
                className={`searchInput ${isOpen ? "open" : ""}`}
            />
        </div>
    );
};

export default SearchToggle;

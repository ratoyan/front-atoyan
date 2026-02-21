import type {FC} from "react";
import Right from "../../../assets/images/chevron-right.svg";

// styles
import './Submenu.css';

interface SubmenuProps {
    data: string[];
    className?: string;
}

const Submenu: FC<SubmenuProps> = ({data, className}: SubmenuProps) => {
    return (
        <ul className={`submenu ${className ?? ""}`}>
            {data.map((item) => (
                <li className="submenuItem" key={item}>
                    {item}
                    <img src={Right} alt="right"/>
                </li>
            ))}
        </ul>
    );
};

export default Submenu;

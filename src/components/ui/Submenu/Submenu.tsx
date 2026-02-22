import type {FC} from "react";

// images
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
            {data.map((item: string,index: number) => (
                <li className="submenuItem" key={index}>
                    {item}
                    <img src={Right} alt="right"/>
                </li>
            ))}
        </ul>
    );
};

export default Submenu;

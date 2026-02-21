import {type FC, useEffect, useRef, useState} from "react";

// types
import type {MenuItem} from "../../../types/menu.ts";

// data
import {menuItems} from "../../../data/menu.ts";

// styles
import './MobileMenu.css';

// components
import Submenu from "../../ui/Submenu/Submenu.tsx";

// images
import Close from '../../../assets/images/close.svg'
import Down from '../../../assets/images/chevron-down.svg'

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({isOpen, onClose}) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setActiveIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {isOpen && <div className="mobileMenuBackdrop" onClick={onClose}/>}

            <aside
                className={`mobileMenu ${isOpen ? "open" : ""}`}>
                <div className="mobileMenuHeader">
                    <h2 className="mobileMenu__logo">LOGOTYPE</h2>
                    <img src={Close} alt={'close'} onClick={onClose} className={'closeMenu'}/>
                </div>

                <div ref={menuRef}>
                    <ul className="mobileMenuList">
                        {menuItems.map(({label, submenu}: MenuItem, index: number) => (
                            <li key={label} className="mobileMenuItem" onClick={() => handleToggle(index)}>
                                <span className={'mobileMenuItemLabel'}>{label}</span>
                                <img src={Down} alt={'down'}/>
                                {submenu && (activeIndex == index) && (
                                    <Submenu data={submenu} className={'mobileSubmenuItem'}/>
                                )}
                            </li>
                        ))}

                        <li className="mobileMenuItem">
                            Buy Now
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default MobileMenu;

import {type FC, useState} from "react";

// types
import type {MenuItem} from "../../../types/menu.ts";

// data
import {menuItems} from "../../../data/menu.ts";

// styles
import "./header.css";
import "../../../style/global.css";

// components
import MobileMenu from "../MobileMenu/MobileMenu.tsx";
import Submenu from "../../ui/Submenu/Submenu.tsx";
import SearchToggle from "../../ui/SearchToggle/SearchToggle.tsx";

// images
import Down from "../../../assets/images/chevron-down.svg";
import Menu from "../../../assets/images/menu.svg";
import Logo from "../../../assets/images/logo.svg";

interface HeaderProps {
    search: string;
    setSearch: (val: string) => void;
}

const Header: FC<HeaderProps> = ({search, setSearch}: HeaderProps) => {
    const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

    return (
        <header className="header">
            <MobileMenu isOpen={isMobileMenu} onClose={() => setIsMobileMenu(false)}/>

            <div className="topBar container">
                <div>
                    <img src={Menu} alt="menu" className={'menuToggle'} onClick={() => setIsMobileMenu(true)}/>
                </div>

                <img src={Logo} alt={'logo'}/>

                <div className="right">
                    <SearchToggle value={search} setValue={setSearch}/>
                </div>
            </div>

            <nav className="nav">
                <ul className="menu">
                    {menuItems.map(({label, submenu}: MenuItem, index: number) => (
                        <li className="menuItem" key={index}>
                            {label}
                            <img src={Down} alt="down"/>

                            {submenu && (
                                <Submenu data={submenu}/>
                            )}
                        </li>
                    ))}

                    {/* BUY NOW */}
                    <li className="menuItem buyNow">Buy Now</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

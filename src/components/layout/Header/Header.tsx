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

// images
import Search from "../../../assets/images/search.svg";
import Down from "../../../assets/images/chevron-down.svg";
import Menu from "../../../assets/images/menu.svg";

const Header: FC = () => {
    const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

    return (
        <header className="header">
            <MobileMenu isOpen={isMobileMenu} onClose={() => setIsMobileMenu(false)}/>
            {/* TOP BAR */}
            <div className="topBar container">
                <div>
                    <button className={'menuToggle'} onClick={() => setIsMobileMenu(true)}>
                        <img src={Menu} alt="menu"/>
                    </button>
                </div>


                <h1 className="logoText">LOGOTYPE</h1>

                <div className="right">
                    <img src={Search} alt="search"/>
                </div>
            </div>

            {/* NAVIGATION */}
            <nav className="nav">
                <ul className="menu">
                    {menuItems.map(({label, submenu}: MenuItem) => (
                        <li className="menuItem" key={label}>
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

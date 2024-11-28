"use client";
import NavLinkCustom from "./nav-link";

interface NavMenuProps {
    mbl: boolean;
    action?: () => void;
}

const NavMenu = ({ mbl, action }: NavMenuProps) => {
    return (
        <div
            className={`collapse navbar-collapse ${mbl ? "show" : ""}`}
            id="navcol-2"
            onClick={mbl ? action : () => {}}
        >
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLinkCustom title="HOME" href="/" />
                </li>
                <li className="nav-item">
                    <NavLinkCustom title="HISTÓRICO" href="/historico" />
                </li>
            </ul>
        </div>
    );
};

export default NavMenu;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkCustomProps {
    title: string;
    href: string;
}

const NavLinkCustom = ({ title, href }: NavLinkCustomProps) => {
    const path = usePathname();

    return (
        <Link
            className={`nav-link ${path.endsWith(href) ? "active" : ""}`}
            href={href}
        >
            {title}
        </Link>
    );
};

export default NavLinkCustom;

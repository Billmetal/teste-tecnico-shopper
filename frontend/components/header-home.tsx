import Image from "next/image";
import logoTopo from "@/assets/img/logo-topo.png";
import Link from "next/link";
import NavMenu from "./nav-menu";
import MobileMenu from "./mobile-menu";

const HeaderHome = () => {
    return (
        <nav className="navbar navbar-light navbar-expand-md fixed-top py-3 main-header">
            <div className="container">
                <Link
                    className="navbar-brand d-flex align-items-center"
                    href="#"
                >
                    <Image
                        width={203}
                        height={55}
                        src={logoTopo}
                        alt="Logo Shopper"
                    />
                </Link>

                <NavMenu mbl={false} />
                <MobileMenu />
            </div>
        </nav>
    );
};

export default HeaderHome;

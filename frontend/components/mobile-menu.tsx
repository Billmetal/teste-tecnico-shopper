"use client";
import { useState } from "react";
import CustomOffcanvas from "./custom-offcanvas";
import NavMenu from "./nav-menu";

const MobileMenu = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOpen = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    return (
        <>
            <button
                data-bs-toggle="collapse"
                className="navbar-toggler custom-toggler"
                // data-bs-target="#navcol-5"
                onClick={handleOpen}
            >
                <span className="visually-hidden">Toggle navigation</span>
                <span className="navbar-toggler-icon" />
            </button>

            <CustomOffcanvas
                show={showOffcanvas}
                onClose={handleClose}
                direction="right"
                bgStyle="dark"
                fullScreen={false}
            >
                <h4>MENU</h4>

                <NavMenu mbl={true} action={handleClose} />
            </CustomOffcanvas>
        </>
    );
};

export default MobileMenu;

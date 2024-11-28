import classes from "./custom-offcanvas.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface CustomOffcanvasProps {
    show: boolean;
    onClose: () => void;
    direction: string;
    bgStyle: string;
    fullScreen: boolean;
    children: React.ReactNode;
}

const CustomOffcanvas = ({
    show,
    onClose,
    direction = "right",
    bgStyle,
    fullScreen,
    children,
}: CustomOffcanvasProps) => {
    const offcanvasClass =
        direction === "right" ? classes.offcanvasRight : classes.offcanvasLeft;
    const closeBtnClass =
        direction === "right" ? classes.closeBtnLeft : classes.closeBtnRight;

    const bgColorStyle = bgStyle === "dark" ? classes.dark : "";
    const fScreen = fullScreen ? classes.fullScreen : "";

    return (
        <div
            className={`${classes.offcanvasContainer} ${
                show ? classes.show : ""
            }`}
        >
            <div
                className={`${classes.offcanvas} ${offcanvasClass} ${bgColorStyle} ${fScreen}`}
            >
                <button className={closeBtnClass} onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} color="#ffffff" />
                </button>
                {children}
            </div>
            <div className={classes.offcanvasBackdrop} onClick={onClose}></div>
        </div>
    );
};

export default CustomOffcanvas;

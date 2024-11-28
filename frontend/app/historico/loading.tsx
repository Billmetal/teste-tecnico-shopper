import { Spinner } from "react-bootstrap";

const MainLoading = () => {
    return (
        <>
            <div className="wrapper-main-spinner-center">
                <Spinner className="custom-spinner" />
            </div>
        </>
    );
};

export default MainLoading;

"use client";
import { useFormStatus } from "react-dom";

interface ErrorWarningProps {
    error: boolean;
    errorMsg: string;
}

const ErrorWarning = ({ error, errorMsg }: ErrorWarningProps) => {
    const status = useFormStatus();

    return (
        <>
            {!status.pending && error && (
                <div className="error-white-box mt-4 mb-4">{errorMsg}</div>
            )}
        </>
    );
};

export default ErrorWarning;

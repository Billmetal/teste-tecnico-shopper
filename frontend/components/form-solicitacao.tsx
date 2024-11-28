"use client";
import { useFormState, useFormStatus } from "react-dom";
import { submitFormSolicitacao } from "@/actions/form-actions";
import ErrorWarning from "./error-warning-status";

const FormSolicitacao = () => {
    const [state, formData] = useFormState(submitFormSolicitacao, {
        error: false,
        success: false,
        message: "",
    });

    const status = useFormStatus();

    return (
        <form action={formData}>
            <div className="mb-3">
                <label className="form-label" htmlFor="id">
                    ID
                </label>
                <input
                    className="form-control"
                    type="text"
                    id="usr_id"
                    name="usr_id"
                    disabled={false || status.pending}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="origem">
                    ORIGEM
                </label>
                <input
                    className="form-control"
                    type="text"
                    id="origem"
                    name="origem"
                    disabled={false || status.pending}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="destino">
                    DESTINO
                </label>
                <input
                    className="form-control"
                    type="text"
                    id="destino"
                    name="destino"
                    disabled={false || status.pending}
                />
            </div>
            <div className="mb-3">
                <button
                    className="btn btn-green"
                    type="submit"
                    disabled={false || status.pending}
                >
                    {status.pending ? "ENVIANDO..." : "PROCURAR"}
                </button>
                <ErrorWarning error={state.error} errorMsg={state.message} />
            </div>
        </form>
    );
};

export default FormSolicitacao;

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requiredFields } from "@/utils/funcs";

interface FormStateSolicitacao {
    error: boolean;
    success: boolean;
    message: string;
}

export const submitFormSolicitacao = async (
    prevState: FormStateSolicitacao,
    formData: FormData
): Promise<FormStateSolicitacao> => {
    const camposParaValidar = [
        { value: formData.get("usr_id"), name: "ID DO USUÁRIO" },
        { value: formData.get("origem"), name: "Origem" },
        { value: formData.get("destino"), name: "Destino" },
    ];

    if (requiredFields(camposParaValidar) === false) {
        return {
            error: true,
            success: false,
            message: "Os campos são obrigatórios.",
        };
    }

    try {
        cookies().set({
            name: "frm-org",
            value: JSON.stringify({
                uid: formData.get("usr_id"),
                origem: formData.get("origem"),
                destino: formData.get("destino"),
            }),
            httpOnly: true,
            path: "/",
        });
    } catch (err) {
        console.log("ERRO SERVER", err);
        return { error: true, success: false, message: "Erro interno." };
    }
    redirect("/solicitacao-viagem");
    return { error: false, success: true, message: "" };
};

export const limparCookieFormulario = async () => {
    cookies().delete("frm-org");
};

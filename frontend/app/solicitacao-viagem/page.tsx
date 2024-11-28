import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import BoxMotorista from "@/components/box-motorista";
import { solicitacaoService } from "@/services/main-services";

export const dynamic = "force-dynamic";

const SolicitacaoViagemPage = async () => {
    const cookieStore = cookies();
    const formularioDados = cookieStore.get("frm-org");
    const dados = formularioDados ? JSON.parse(formularioDados.value) : {};
    const origem = dados.origem || "";
    const destino = dados.destino || "";
    const uid = dados.uid || "";
    let success: boolean;

    if (origem === "" || destino === "" || uid === "") {
        redirect("/");
    }

    const dataPost = JSON.stringify({
        customer_id: uid,
        origin: origem,
        destination: destino,
    });

    const returnData = await solicitacaoService(dataPost);

    console.log("RETURN DATA:", returnData);

    return (
        <section id="section-mapa" className="section-mapa">
            <div className="container-fluid">
                <div className="row row100">
                    <div className="col-12 col-md-4 left-col">
                        <h4 className="h-dark-blue mb-2">Opções de viagem</h4>
                        <div className="mb-3">
                            <h5 className="item-detalhes">
                                <span>ID DO USUÁRIO:</span>
                                <br />
                                {uid}
                            </h5>
                            <h5 className="item-detalhes">
                                <span>ORIGEM:</span>
                                <br />
                                {origem}
                            </h5>
                            <h5 className="item-detalhes">
                                <span>DESTINO:</span>
                                <br />
                                {destino}
                            </h5>
                        </div>
                        <BoxMotorista
                            id={1}
                            nome="James Bond"
                            preco="60,90"
                            carro="Fiat Uno Branco"
                            rate="4.9"
                            descricao='"Boa noite, sou James Bond. À seu dispor para um passeio   suave e discreto. Aperte o cinto e aproveite a viagem."'
                        />

                        <BoxMotorista
                            id={1}
                            nome="James Bond"
                            preco="60,90"
                            carro="Fiat Uno Branco"
                            rate="4.9"
                            descricao='"Boa noite, sou James Bond. À seu dispor para um passeio   suave e discreto. Aperte o cinto e aproveite a viagem."'
                        />

                        <BoxMotorista
                            id={1}
                            nome="James Bond"
                            preco="60,90"
                            carro="Fiat Uno Branco"
                            rate="4.9"
                            descricao='"Boa noite, sou James Bond. À seu dispor para um passeio   suave e discreto. Aperte o cinto e aproveite a viagem."'
                        />
                    </div>
                    <div className="col-12 col-md-8 order-first order-md-last right-col">
                        <div className="wrapper-mapa">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.206646959326!2d-46.65832805616078!3d-23.561020608231935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1732678234451!5m2!1spt-BR!2sbr"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolicitacaoViagemPage;

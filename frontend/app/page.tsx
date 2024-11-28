import FormSolicitacao from "@/components/form-solicitacao";

const HomePage = () => {
    return (
        <main>
            <section id="section-destino" className="section-form">
                <div className="wrapper-form">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-5">
                                <div className="shadow-box">
                                    <h4 className="mb-4">
                                        SOLICITAÇÃO DE VIAGEM
                                    </h4>
                                    <FormSolicitacao />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;

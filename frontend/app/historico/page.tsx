import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons/faSliders";
import BoxHistorico from "@/components/box-historico";

const HistoricoPage = () => {
    return (
        <section className="section-hist">
            <h4 className="mb-4">Histórico de viagens</h4>
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-12 col-md-6">
                        <div className="box-hist">
                            <h1 className="filter-title">
                                <FontAwesomeIcon icon={faSliders} />
                                &nbsp;Filtros
                            </h1>
                            <form>
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <div className="mb-3">
                                            <label
                                                className="form-label"
                                                htmlFor="origem"
                                            >
                                                ID DO USUÁRIO
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="origem"
                                                name="origem"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <div className="mb-3">
                                            <label
                                                className="form-label"
                                                htmlFor="origem"
                                            >
                                                MOTORISTA
                                            </label>
                                            <select className="form-select">
                                                <option value={0}>
                                                    SELECIONE
                                                </option>
                                                <option value={13}>
                                                    TODOS
                                                </option>
                                                <option value={14}>
                                                    This is item 3
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <button
                                        className="btn btn-green"
                                        type="button"
                                    >
                                        FILTRAR
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <BoxHistorico
                    id={1}
                    data="26/11/2024"
                    hora="14:30"
                    nome="HOMER SIMPSON"
                    origem="Avenida Marari, 539 - São Paulo - SP - Vila Marari"
                    destino="Avenida Yervantti, 416"
                    distancia="2KM"
                    tempo="16 min."
                    valor="R$ 56,99"
                />

                <BoxHistorico
                    id={1}
                    data="26/11/2024"
                    hora="14:30"
                    nome="HOMER SIMPSON"
                    origem="Avenida Marari, 539 - São Paulo - SP - Vila Marari"
                    destino="Avenida Yervantti, 416"
                    distancia="2KM"
                    tempo="16 min."
                    valor="R$ 56,99"
                />
            </div>
        </section>
    );
};

export default HistoricoPage;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface BoxMotoristaProps {
    id: number;
    nome: string;
    preco: string;
    carro: string;
    rate: string;
    descricao: string;
}

const BoxMotorista = ({
    id,
    nome,
    preco,
    carro,
    rate,
    descricao,
}: BoxMotoristaProps) => {
    return (
        <div className="box-motorista mb-4">
            <div className="wrapper-detalhes">
                <h5 className="nome mb-1">{nome}</h5>
                <h5 className="detalhes mb-1">
                    PREÇO:&nbsp;R$ <span>{preco}</span> | CARRO: {carro}
                </h5>
                <h5 className="detalhes mb-1">
                    <FontAwesomeIcon icon={faStar} color="#f9bd64" /> {rate}
                </h5>
                <p>{descricao}</p>
                <div className="wrapper-btn mt-2">
                    <button className="btn btn-sm btn-green" type="button">
                        ESCOLHER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoxMotorista;

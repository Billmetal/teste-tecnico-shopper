import React from "react";

interface BoxHistoricoProps {
    id: number;
    data: string;
    hora: string;
    nome: string;
    origem: string;
    destino: string;
    distancia: string;
    tempo: string;
    valor: string;
}

const BoxHistorico = (props: BoxHistoricoProps) => {
    return (
        <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-6">
                <div className="box-hist">
                    <div className="mb-3">
                        <h5 className="item-detalhes">
                            <span>
                                {props.data} • {props.hora}
                            </span>
                            <br />
                        </h5>
                        <h5 className="item-detalhes nome">{props.nome}</h5>
                        <h5 className="item-detalhes">
                            <span>ORIGEM:</span>
                            <br />
                            {props.origem}
                        </h5>
                        <h5 className="item-detalhes">
                            <span>DESTINO:</span>
                            <br />
                            {props.destino}
                        </h5>
                    </div>
                    <div className="wrapper-valores">
                        <h5 className="item-detalhes">
                            <span>DISTÂNCIA:</span>
                            <br />
                            {props.distancia}
                        </h5>
                        <h5 className="item-detalhes">
                            <span>TEMPO:</span>
                            <br />
                            {props.tempo}
                        </h5>
                        <h5 className="item-detalhes">
                            <span>VALOR:</span>
                            <br />
                            {props.valor}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxHistorico;

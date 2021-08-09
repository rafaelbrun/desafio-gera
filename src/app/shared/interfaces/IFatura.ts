export interface IFatura {
    id?: number;
    unidadeConsumidoraId: number;
    data_de_vencimento: string;
    consumo: number;
    valor: number;
}
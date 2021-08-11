export interface IFatura {
    id?: number;
    unidadeConsumidoraId: number;
    ucNome?: string;
    data_de_vencimento: string;
    consumo: number;
    valor: number;
}
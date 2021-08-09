import { IFatura } from "./IFatura";

export interface IUnidadeConsumidora {
    id?: number;
    endereco: string;
    distribuidora: string;
    nome: string;
    numero: string;
    faturas?: IFatura[];
}
export interface Acao {
    nome: string; 
    codigo: string; 
    cnpj: string; 
    setor: string;
}

export interface CarteiraAtivo {
    codigo: string;
    quantidade: number;
    valorMedio: number;
    valorAtual: number;
    totalCompra: number;
    totalAtual: number;
}

export interface Carteira {
    valorInvestido: number;
    valorAtual: number;
    ativos: CarteiraAtivo[]
}

export interface ValorData {
    data: string;
    valor: number;
}
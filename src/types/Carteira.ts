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

export interface CarteiraInformacao {
    ativos: AtivoInformacao[];
}

export interface AtivoInformacao {
    codigo: string;
    tipo: string;
    entrada: ValorInformacao;
    saida: ValorInformacao;
    atual: ValorInformacao;
    saldo: number;
    variacao: number;
    rentabilidade: number;
}

export interface ValorInformacao {
    quantidade: number;
    valorMedio: number;
    valorTotal: number;
}
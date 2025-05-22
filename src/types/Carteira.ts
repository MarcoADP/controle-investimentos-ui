export interface Acao {
    nome: string 
    codigo: string 
    cnpj: string 
    setor: string
}

export interface InvestimentoResumo {
    valorInvestido: number
    valorAtual: number
    proventos: number
    proventosAno: number
    saldo: number
    variacao: number
    rentabilidade: number
}

export interface CarteiraAtivo {
    codigo: string
    quantidade: number
    valorMedio: number
    valorAtual: number
    totalCompra: number
    totalAtual: number
}

export interface Carteira {
    valorInvestido: number
    valorAtual: number
    ativos: CarteiraAtivo[]
}

export interface ValorData {
    data: string
    valor: number
}

export interface CarteiraInformacao {
    ativos: AtivoInformacao[]
}

export interface AtivoInformacao {
    codigo: string
    tipo: string
    entrada: ValorInformacao
    saida: ValorInformacao
    atual: ValorInformacao
    saldo: number
    variacao: number
    rentabilidade: number
}

export interface ValorInformacao {
    quantidade: number
    valorMedio: number
    valorTotal: number
}

export interface ProventoHistorico {
    valorTotal: number
    proventos: ProventoHistoricoCodigo[]
}

export interface ProventoHistoricoCodigo {
    codigo: string
    tipo: string
    valorTotal: number
    valorPorAno: Map<string, number>
}

export interface ProventosPeriodo {
    periodo: string
    valor: number
}

export interface Provento {
    dataPagamento: string 
    tipoProvento: string 
    codigo: string
    quantidade: number
    valorTotal: number 
    valorMedio: number
}
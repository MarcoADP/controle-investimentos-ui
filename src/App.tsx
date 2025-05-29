import InvestmentChart from './components/InvestmentChart';
import ValorMensal from './components/ValorMensal';
import CarteiraTable from './components/CarteiraTable';
import CarteiraResumo from './components/CarteiraResumo';
import ProventoHistorico from './components/ProventoHistorico';
import ProventoGrafico from './components/ProventoGrafico';
import ProventoTable from './components/ProventoTable';
import CarteiraProporcao from './components/CarteiraProporcao';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import EvolucaoPatrimonio from './components/EvolucaoPatrimonio';

function App() {
  return (
    <div className="p-4 div-app content-start md:content-around">

      <Tabs defaultValue="carteira" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="carteira">Carteira</TabsTrigger>
          <TabsTrigger value="proventos">Proventos</TabsTrigger>
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="carteira">
          <h1 className="text-2xl font-bold mb-8">Resumo</h1>
          <CarteiraResumo />
          <div className="flex gap-4">
            <div className="mb-4 flex w-[65%]">
              <h1 className="text-2xl font-bold mb-8">Evolução do Patrimônio</h1>
            </div>
            <div className="mb-4 flex w-[35%]">
              <h1 className="text-2xl font-bold mb-8">Composição</h1>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-4 flex w-[65%]">
              <EvolucaoPatrimonio  />
            </div>
            <div className="mb-4 flex w-[35%]">
              <CarteiraProporcao  />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-8">Carteira</h1>
          <CarteiraTable />
        </TabsContent>

        <TabsContent value="proventos">
          <h1 className="text-2xl font-bold mb-8">Proventos recebidos por ano</h1>
          <ProventoGrafico />
          <h1 className="text-2xl font-bold mb-8 p-10">Lista de Proventos recebidos</h1>
          <ProventoTable />
          <h1 className="text-2xl font-bold mb-8 p-10">Histórico de Proventos por Ativo</h1>
          <ProventoHistorico />
        </TabsContent>

        <TabsContent value="graficos">
          <h1 className="text-2xl font-bold mb-4">Gráfico de Investimentos</h1>
          <InvestmentChart />
          <h1 className="text-2xl font-bold mb-4">Gráfico de Investimentos</h1>
          <ValorMensal />
        </TabsContent>


      </Tabs>
    </div>
  );
}

export default App;
import InvestmentChart from './components/InvestmentChart';
import ValorMensal from './components/ValorMensal';
import CarteiraTable from './components/CarteiraTable';
import ProventoHistorico from './components/ProventoHistorico';
import ProventoGrafico from './components/ProventoGrafico';
import ProventoTable from './components/ProventoTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function App() {
  return (
    <div className="p-4 div-app content-start md:content-around">

      <Tabs defaultValue="proventos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="carteira">Carteira</TabsTrigger>
          <TabsTrigger value="proventos" >Proventos</TabsTrigger>
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="carteira">
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
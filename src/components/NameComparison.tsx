
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Loading from './Loading';
import { getNameFrequency } from '@/services/ibgeService';
import { processNameFrequencyData } from '@/services/nameService';

const NameComparison: React.FC = () => {
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSearch = async () => {
    if (!name1.trim() || !name2.trim()) {
      toast.error('Por favor, informe dois nomes para comparação');
      return;
    }
    
    setLoading(true);
    
    try {
      const [response1, response2] = await Promise.all([
        getNameFrequency(name1),
        getNameFrequency(name2)
      ]);
      
      if (response1.length === 0 || response2.length === 0) {
        setChartData([]);
        toast.error('Nenhum dado encontrado para um ou ambos os nomes');
        setLoading(false);
        return;
      }
      
      const processedData1 = processNameFrequencyData(response1);
      const processedData2 = processNameFrequencyData(response2);
      
      // Merge data for comparison chart
      const mergedData: any[] = [];
      
      processedData1[0].data.forEach((item) => {
        const matchingItem = processedData2[0].data.find(
          (i) => i.period === item.period
        );
        
        mergedData.push({
          period: item.period,
          [name1]: item.frequency,
          [name2]: matchingItem ? matchingItem.frequency : 0,
        });
      });
      
      setChartData(mergedData);
      toast.success('Dados carregados com sucesso');
    } catch (error) {
      console.error('Error fetching name comparison data:', error);
      toast.error('Erro ao buscar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comparação de Dois Nomes</CardTitle>
        <CardDescription>
          Compare a popularidade de dois nomes ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="name1">Primeiro Nome</Label>
            <Input
              id="name1"
              placeholder="Ex: Maria"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="name2">Segundo Nome</Label>
            <Input
              id="name2"
              placeholder="Ex: Ana"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleSearch} 
              className="w-full"
              disabled={loading}
            >
              Comparar Nomes
            </Button>
          </div>
        </div>
        
        <div className="mt-8 chart-container">
          {loading ? (
            <Loading />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR').format(value as number)} />
                <Legend />
                <Bar dataKey={name1} name={name1} fill="#3b82f6" />
                <Bar dataKey={name2} name={name2} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
              <p>Nenhum dado para exibir</p>
              <p className="text-sm mt-2">Informe dois nomes para visualizar o gráfico de comparação</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameComparison;


import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Loading from './Loading';
import { getNameFrequencyByPeriod } from '@/services/ibgeService';
import { processNameFrequencyData, getDecadeOptions, createPeriodRange } from '@/services/nameService';

const NameEvolution: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [startDecade, setStartDecade] = useState<string>('1930[1940');
  const [endDecade, setEndDecade] = useState<string>('2000[2010');
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const decadeOptions = getDecadeOptions();

  const handleSearch = async () => {
    if (!name.trim()) {
      toast.error('Por favor, informe um nome');
      return;
    }
    
    // Extract years for period range
    const startYear = parseInt(startDecade.split('[')[0]);
    const endYearPart = endDecade.split('[')[1] || '2020';
    const endYear = parseInt(endYearPart) || 2020;
    
    if (startYear >= endYear) {
      toast.error('A década inicial deve ser menor que a década final');
      return;
    }
    
    setLoading(true);
    
    try {
      const periodRange = createPeriodRange(startYear, endYear);
      const response = await getNameFrequencyByPeriod(name, periodRange);
      
      if (response.length === 0) {
        setChartData([]);
        toast.error('Nenhum dado encontrado para este nome no período selecionado');
        setLoading(false);
        return;
      }
      
      const processedData = processNameFrequencyData(response);
      
      // Transform data for the chart
      const chartFormattedData = processedData[0].data.map((item) => ({
        period: item.period,
        frequency: item.frequency,
      }));
      
      setChartData(chartFormattedData);
      toast.success('Dados carregados com sucesso');
    } catch (error) {
      console.error('Error fetching name evolution data:', error);
      toast.error('Erro ao buscar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Evolução do Ranking de um Nome</CardTitle>
        <CardDescription>
          Informe um nome e defina um intervalo de décadas para analisar sua evolução
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Ex: Maria, João, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="startDecade">Década Inicial</Label>
            <Select 
              value={startDecade} 
              onValueChange={setStartDecade}
            >
              <SelectTrigger id="startDecade">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {decadeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="endDecade">Década Final</Label>
            <Select 
              value={endDecade} 
              onValueChange={setEndDecade}
            >
              <SelectTrigger id="endDecade">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {decadeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleSearch} 
          className="w-full md:w-auto"
          disabled={loading}
        >
          Buscar Dados
        </Button>
        
        <div className="mt-8 chart-container">
          {loading ? (
            <Loading />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR').format(value as number)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="frequency" 
                  name={`Frequência do nome ${name}`}
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
              <p>Nenhum dado para exibir</p>
              <p className="text-sm mt-2">Informe um nome e um período para visualizar o gráfico</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameEvolution;

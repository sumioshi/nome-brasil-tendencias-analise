
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
    <Card className="card-enhanced rounded-2xl border-0 shadow-2xl relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/30 to-purple-50/30 dark:from-slate-800/95 dark:via-slate-700/30 dark:to-slate-600/30"></div>
      
      <CardHeader className="relative z-10 pb-6">
        <CardTitle className="text-2xl font-bold text-contrast">
          Evolução do Ranking de um Nome
        </CardTitle>
        <CardDescription className="text-contrast-muted text-base">
          Informe um nome e defina um intervalo de décadas para analisar sua evolução
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-2 space-y-3">
            <Label htmlFor="name" className="text-sm font-semibold text-contrast">Nome</Label>
            <Input
              id="name"
              placeholder="Ex: Maria, João, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-enhanced h-12 text-base rounded-xl"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="startDecade" className="text-sm font-semibold text-contrast">Década Inicial</Label>
            <Select value={startDecade} onValueChange={setStartDecade}>
              <SelectTrigger id="startDecade" className="input-enhanced h-12 rounded-xl">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                {decadeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-contrast">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label htmlFor="endDecade" className="text-sm font-semibold text-contrast">Década Final</Label>
            <Select value={endDecade} onValueChange={setEndDecade}>
              <SelectTrigger id="endDecade" className="input-enhanced h-12 rounded-xl">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                {decadeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-contrast">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleSearch} 
          className="btn-primary w-full md:w-auto h-12 px-8 rounded-xl font-semibold text-lg"
          disabled={loading}
        >
          Buscar Dados
        </Button>
        
        <div className="mt-8 card-enhanced rounded-xl p-6">
          {loading ? (
            <Loading />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis 
                  dataKey="period" 
                  stroke="#64748b"
                  className="dark:stroke-slate-300"
                  fontSize={12}
                  fontWeight={500}
                />
                <YAxis 
                  stroke="#64748b"
                  className="dark:stroke-slate-300"
                  fontSize={12}
                  fontWeight={500}
                />
                <Tooltip 
                  formatter={(value) => new Intl.NumberFormat('pt-BR').format(value as number)}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: '#1e293b'
                  }}
                  className="dark:[&>div]:!bg-slate-800/95 dark:[&>div]:!text-slate-100"
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="frequency" 
                  name={`Frequência do nome ${name}`}
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: "#3b82f6" }} 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-contrast-subtle">
              <div className="text-6xl mb-4 opacity-40">📈</div>
              <p className="text-lg font-medium text-contrast-muted">Nenhum dado para exibir</p>
              <p className="text-sm mt-2 text-center max-w-md text-contrast-subtle">
                Informe um nome e um período para visualizar o gráfico
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameEvolution;

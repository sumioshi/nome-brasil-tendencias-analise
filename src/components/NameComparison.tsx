
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
    <Card className="modern-card rounded-2xl border-0 shadow-2xl relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/30 to-purple-50/30 dark:from-slate-800/95 dark:via-slate-700/30 dark:to-slate-600/30"></div>
      
      <CardHeader className="relative z-10 pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Comparação de Dois Nomes
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
          Compare a popularidade de dois nomes ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-3">
            <Label htmlFor="name1" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Primeiro Nome
            </Label>
            <Input
              id="name1"
              placeholder="Ex: Maria"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="modern-card border-0 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm h-12 text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="name2" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Segundo Nome
            </Label>
            <Input
              id="name2"
              placeholder="Ex: Ana"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="modern-card border-0 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm h-12 text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleSearch} 
              className="w-full h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              Comparar Nomes
            </Button>
          </div>
        </div>
        
        <div className="mt-8 modern-card rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          {loading ? (
            <Loading />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis 
                  dataKey="period" 
                  stroke="#64748b"
                  fontSize={12}
                  fontWeight={500}
                />
                <YAxis 
                  stroke="#64748b"
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
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey={name1} 
                  name={name1} 
                  fill="url(#gradient1)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey={name2} 
                  name={name2} 
                  fill="url(#gradient2)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-slate-500 dark:text-slate-400">
              <div className="text-6xl mb-4 opacity-30">📊</div>
              <p className="text-lg font-medium">Nenhum dado para exibir</p>
              <p className="text-sm mt-2 text-center max-w-md">
                Informe dois nomes para visualizar o gráfico de comparação
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameComparison;

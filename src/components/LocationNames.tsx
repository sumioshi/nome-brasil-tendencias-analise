
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import Loading from './Loading';
import { getNameRankingByLocation } from '@/services/ibgeService';
import { processNameRankingData } from '@/services/nameService';

const LocationNames: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('');

  const handleSearch = async () => {
    if (!location.trim()) {
      toast.error('Por favor, informe uma localidade (código IBGE)');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await getNameRankingByLocation(location);
      
      if (response.length === 0) {
        setRankingData([]);
        toast.error('Nenhum dado encontrado para esta localidade');
        setLoading(false);
        return;
      }
      
      const processedData = processNameRankingData(response);
      setRankingData(processedData);
      setLocationName(response[0].localidade);
      toast.success('Dados carregados com sucesso');
    } catch (error) {
      console.error('Error fetching location names data:', error);
      toast.error('Erro ao buscar dados. Verifique o código da localidade.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Evolução do Ranking de Nomes em uma Localidade</CardTitle>
        <CardDescription>
          Selecione uma localidade para ver os três nomes mais frequentes ao longo das décadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3">
            <Label htmlFor="location">Código da Localidade (UF ou Município)</Label>
            <Input
              id="location"
              placeholder="Ex: 33 (Rio de Janeiro), 3304557 (município Rio de Janeiro)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Para UF use o código de 2 dígitos (Ex: 35 para São Paulo) e para municípios use o código IBGE de 7 dígitos
            </p>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleSearch} 
              className="w-full"
              disabled={loading}
            >
              Buscar Dados
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          {loading ? (
            <Loading />
          ) : rankingData.length > 0 ? (
            <>
              <h3 className="text-lg font-medium mb-4">
                Top 3 Nomes em {locationName}
              </h3>
              <Table>
                <TableCaption>Dados de frequência de nomes por período</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ranking</TableHead>
                    <TableHead className="text-right">Frequência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingData.map((period) => (
                    period.names.map((nameItem, nameIndex) => (
                      <TableRow key={`${period.period}-${nameItem.name}`}>
                        {nameIndex === 0 ? (
                          <TableCell rowSpan={3}>{period.period}</TableCell>
                        ) : null}
                        <TableCell className="font-medium">{nameItem.name}</TableCell>
                        <TableCell>{nameItem.ranking}</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('pt-BR').format(nameItem.frequency)}
                        </TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
              <p>Nenhum dado para exibir</p>
              <p className="text-sm mt-2">Informe um código de localidade para visualizar a tabela</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationNames;

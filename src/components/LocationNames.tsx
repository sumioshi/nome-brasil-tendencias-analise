import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Loading from './Loading';
import { getNameRankingByLocation } from '@/services/ibgeService';
import { processNameRankingData } from '@/services/nameService';

const LocationNames: React.FC = () => {
  const [selectedUF, setSelectedUF] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filterType, setFilterType] = useState<'uf' | 'city'>('uf');
  const [rankingLimit, setRankingLimit] = useState<string>('10');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('');

  // Estados brasileiros organizados por região
  const states = [
    // Norte
    { code: '11', name: 'Rondônia', uf: 'RO', region: 'Norte' },
    { code: '12', name: 'Acre', uf: 'AC', region: 'Norte' },
    { code: '13', name: 'Amazonas', uf: 'AM', region: 'Norte' },
    { code: '14', name: 'Roraima', uf: 'RR', region: 'Norte' },
    { code: '15', name: 'Pará', uf: 'PA', region: 'Norte' },
    { code: '16', name: 'Amapá', uf: 'AP', region: 'Norte' },
    { code: '17', name: 'Tocantins', uf: 'TO', region: 'Norte' },
    // Nordeste
    { code: '21', name: 'Maranhão', uf: 'MA', region: 'Nordeste' },
    { code: '22', name: 'Piauí', uf: 'PI', region: 'Nordeste' },
    { code: '23', name: 'Ceará', uf: 'CE', region: 'Nordeste' },
    { code: '24', name: 'Rio Grande do Norte', uf: 'RN', region: 'Nordeste' },
    { code: '25', name: 'Paraíba', uf: 'PB', region: 'Nordeste' },
    { code: '26', name: 'Pernambuco', uf: 'PE', region: 'Nordeste' },
    { code: '27', name: 'Alagoas', uf: 'AL', region: 'Nordeste' },
    { code: '28', name: 'Sergipe', uf: 'SE', region: 'Nordeste' },
    { code: '29', name: 'Bahia', uf: 'BA', region: 'Nordeste' },
    // Sudeste
    { code: '31', name: 'Minas Gerais', uf: 'MG', region: 'Sudeste' },
    { code: '32', name: 'Espírito Santo', uf: 'ES', region: 'Sudeste' },
    { code: '33', name: 'Rio de Janeiro', uf: 'RJ', region: 'Sudeste' },
    { code: '35', name: 'São Paulo', uf: 'SP', region: 'Sudeste' },
    // Sul
    { code: '41', name: 'Paraná', uf: 'PR', region: 'Sul' },
    { code: '42', name: 'Santa Catarina', uf: 'SC', region: 'Sul' },
    { code: '43', name: 'Rio Grande do Sul', uf: 'RS', region: 'Sul' },
    // Centro-Oeste
    { code: '50', name: 'Mato Grosso do Sul', uf: 'MS', region: 'Centro-Oeste' },
    { code: '51', name: 'Mato Grosso', uf: 'MT', region: 'Centro-Oeste' },
    { code: '52', name: 'Goiás', uf: 'GO', region: 'Centro-Oeste' },
    { code: '53', name: 'Distrito Federal', uf: 'DF', region: 'Centro-Oeste' },
  ];

  // Principais cidades por estado
  const citiesByState = {
    '35': [ // São Paulo
      { code: '3550308', name: 'São Paulo' },
      { code: '3509502', name: 'Campinas' },
      { code: '3518800', name: 'Guarulhos' },
      { code: '3547809', name: 'Santo André' },
      { code: '3552205', name: 'São Bernardo do Campo' },
    ],
    '33': [ // Rio de Janeiro
      { code: '3304557', name: 'Rio de Janeiro' },
      { code: '3301702', name: 'Duque de Caxias' },
      { code: '3303500', name: 'Nova Iguaçu' },
      { code: '3303302', name: 'Niterói' },
    ],
    '31': [ // Minas Gerais
      { code: '3106200', name: 'Belo Horizonte' },
      { code: '3170206', name: 'Uberlândia' },
      { code: '3118601', name: 'Contagem' },
    ],
    '41': [ // Paraná
      { code: '4106902', name: 'Curitiba' },
      { code: '4113700', name: 'Londrina' },
      { code: '4115200', name: 'Maringá' },
    ],
    '43': [ // Rio Grande do Sul
      { code: '4314902', name: 'Porto Alegre' },
    ],
    '42': [ // Santa Catarina
      { code: '4205407', name: 'Florianópolis' },
      { code: '4209102', name: 'Joinville' },
    ],
    '23': [ // Ceará
      { code: '2304400', name: 'Fortaleza' },
    ],
    '29': [ // Bahia
      { code: '2927408', name: 'Salvador' },
    ],
    '53': [ // Distrito Federal
      { code: '5300108', name: 'Brasília' },
    ],
    '26': [ // Pernambuco
      { code: '2611606', name: 'Recife' },
    ],
    '13': [ // Amazonas
      { code: '1302603', name: 'Manaus' },
    ],
  };

  const rankingOptions = [
    { value: '3', label: 'Top 3' },
    { value: '5', label: 'Top 5' },
    { value: '10', label: 'Top 10' },
    { value: '20', label: 'Top 20' },
    { value: '50', label: 'Top 50' },
  ];

  const handleSearch = async () => {
    let locationCode = '';
    let displayName = '';
    
    if (filterType === 'uf' && selectedUF) {
      locationCode = selectedUF;
      const state = states.find(s => s.code === selectedUF);
      displayName = state ? `${state.name} (${state.uf})` : `Estado ${selectedUF}`;
    } else if (filterType === 'city' && selectedCity) {
      locationCode = selectedCity;
      for (const stateCode in citiesByState) {
        const city = citiesByState[stateCode].find(c => c.code === selectedCity);
        if (city) {
          const state = states.find(s => s.code === stateCode);
          displayName = `${city.name} - ${state?.uf}`;
          break;
        }
      }
    }
    
    if (!locationCode) {
      toast.error('Por favor, selecione uma localidade');
      return;
    }
    
    setLoading(true);
    setRankingData([]);
    setLocationName('');
    
    try {
      console.log('Fetching data for location:', locationCode);
      const response = await getNameRankingByLocation(locationCode);
      console.log('API Response:', response);
      
      if (!response || response.length === 0) {
        setRankingData([]);
        toast.error('Nenhum dado encontrado para esta localidade. Verifique o código informado.');
        return;
      }
      
      const processedData = processNameRankingData(response);
      console.log('Processed data:', processedData);
      
      if (processedData.length === 0) {
        toast.error('Não foi possível processar os dados desta localidade');
        return;
      }
      
      // Aplicar filtro de ranking
      const limitedData = {
        ...processedData[0],
        names: processedData[0].names.slice(0, parseInt(rankingLimit))
      };
      
      setRankingData([limitedData]);
      setLocationName(displayName);
      
      // Adicionar informação sobre filtro de datas na mensagem de sucesso
      let successMessage = `Dados carregados com sucesso para ${displayName}`;
      if (startDate || endDate) {
        const dateInfo = [];
        if (startDate) dateInfo.push(`desde ${format(startDate, 'dd/MM/yyyy', { locale: ptBR })}`);
        if (endDate) dateInfo.push(`até ${format(endDate, 'dd/MM/yyyy', { locale: ptBR })}`);
        successMessage += ` (${dateInfo.join(' ')})`;
      }
      
      toast.success(successMessage);
      
    } catch (error) {
      console.error('Error fetching location names data:', error);
      toast.error('Erro ao buscar dados. Verifique sua conexão e tente novamente.');
      setRankingData([]);
      setLocationName('');
    } finally {
      setLoading(false);
    }
  };

  const getCitiesForSelectedState = () => {
    return citiesByState[selectedUF] || [];
  };

  const resetFilters = () => {
    setSelectedUF('');
    setSelectedCity('');
    setRankingLimit('10');
    setStartDate(undefined);
    setEndDate(undefined);
    setRankingData([]);
    setLocationName('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ranking de Nomes por Localidade
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra os nomes mais populares em qualquer estado ou cidade do Brasil
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Seção: Tipo de Consulta */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-600" />
              <Label className="text-lg font-semibold text-gray-800">Selecione o tipo de localidade</Label>
            </div>
            
            <RadioGroup 
              value={filterType} 
              onValueChange={(value) => {
                setFilterType(value as 'uf' | 'city');
                setSelectedUF('');
                setSelectedCity('');
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="uf" id="uf" className="peer sr-only" />
                <Label 
                  htmlFor="uf" 
                  className="flex items-center space-x-3 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-md"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                    {filterType === 'uf' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Estado Completo</div>
                    <div className="text-sm text-gray-500">Consultar dados de todo o estado</div>
                  </div>
                </Label>
              </div>
              
              <div className="relative">
                <RadioGroupItem value="city" id="city" className="peer sr-only" />
                <Label 
                  htmlFor="city" 
                  className="flex items-center space-x-3 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-md"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                    {filterType === 'city' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Cidade Específica</div>
                    <div className="text-sm text-gray-500">Consultar dados de uma cidade</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-8" />

          {/* Seção: Seleção de Localidade */}
          <div className="space-y-6">
            {filterType === 'uf' && (
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-800">Escolha o Estado</Label>
                <Select onValueChange={setSelectedUF} value={selectedUF}>
                  <SelectTrigger className="h-12 text-base border-2 hover:border-blue-300 transition-colors">
                    <SelectValue placeholder="Selecione um estado..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {states.map((state) => (
                      <SelectItem key={state.code} value={state.code} className="py-3">
                        <div className="flex items-center justify-between w-full">
                          <span>{state.name} ({state.uf})</span>
                          <span className="text-xs text-gray-500 ml-2">{state.region}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {filterType === 'city' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-800">Primeiro, escolha o Estado</Label>
                  <Select onValueChange={(value) => {
                    setSelectedUF(value);
                    setSelectedCity('');
                  }} value={selectedUF}>
                    <SelectTrigger className="h-12 text-base border-2 hover:border-blue-300 transition-colors">
                      <SelectValue placeholder="Selecione um estado..." />
                    </SelectTrigger>
                    <SelectContent>
                      {states.filter(state => citiesByState[state.code]).map((state) => (
                        <SelectItem key={state.code} value={state.code} className="py-3">
                          {state.name} ({state.uf})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedUF && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-800">Agora, escolha a Cidade</Label>
                    <Select onValueChange={setSelectedCity} value={selectedCity}>
                      <SelectTrigger className="h-12 text-base border-2 hover:border-blue-300 transition-colors">
                        <SelectValue placeholder="Selecione uma cidade..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getCitiesForSelectedState().map((city) => (
                          <SelectItem key={city.code} value={city.code} className="py-3">
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator className="my-8" />

          {/* Seção: Configurações Avançadas */}
          <div className="space-y-6">
            <Label className="text-lg font-semibold text-gray-800">Configurações do Ranking</Label>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quantidade de nomes */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Quantidade de nomes</Label>
                <Select value={rankingLimit} onValueChange={setRankingLimit}>
                  <SelectTrigger className="h-11 border-2 hover:border-blue-300 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rankingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data de início */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Data de início (opcional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-11 w-full justify-start text-left font-normal border-2 hover:border-blue-300 transition-colors",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date > new Date() || (endDate && date > endDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Data de fim */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Data de fim (opcional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-11 w-full justify-start text-left font-normal border-2 hover:border-blue-300 transition-colors",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date > new Date() || (startDate && date < startDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Botões para limpar datas */}
            {(startDate || endDate) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Limpar datas selecionadas
              </Button>
            )}
          </div>

          <Separator className="my-8" />

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSearch} 
              size="lg"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={loading || (!selectedUF && !selectedCity)}
            >
              {loading ? 'Buscando dados...' : 'Buscar Ranking'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={resetFilters}
              className="px-8 py-3 border-2 hover:bg-gray-50 transition-colors"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loading message="Buscando dados da localidade..." />
            </div>
          ) : rankingData.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  🏆 Ranking de Nomes - {locationName}
                </h3>
                <div className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                  Top {rankingLimit} nomes
                  {(startDate || endDate) && (
                    <div className="text-xs mt-1">
                      {startDate && `De: ${format(startDate, 'dd/MM/yyyy', { locale: ptBR })}`}
                      {startDate && endDate && ' • '}
                      {endDate && `Até: ${format(endDate, 'dd/MM/yyyy', { locale: ptBR })}`}
                    </div>
                  )}
                </div>
              </div>
              
              <Table>
                <TableCaption className="text-gray-500">
                  Ranking dos {rankingLimit} nomes mais populares na localidade selecionada
                  {(startDate || endDate) && ' no período especificado'}
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="font-semibold text-gray-700">Nome</TableHead>
                    <TableHead className="w-[100px] text-center font-semibold text-gray-700">Posição</TableHead>
                    <TableHead className="text-right w-[140px] font-semibold text-gray-700">Frequência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingData[0]?.names.map((nameItem, index) => (
                    <TableRow key={nameItem.name} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-800">{nameItem.name}</TableCell>
                      <TableCell className="text-center">
                        <span className={cn(
                          "inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
                          index === 0 && "bg-yellow-100 text-yellow-800",
                          index === 1 && "bg-gray-100 text-gray-800", 
                          index === 2 && "bg-orange-100 text-orange-800",
                          index > 2 && "bg-blue-100 text-blue-800"
                        )}>
                          {nameItem.ranking}°
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-gray-700">
                        {new Intl.NumberFormat('pt-BR').format(nameItem.frequency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">Pronto para descobrir os nomes mais populares?</p>
                <p className="text-sm mt-2 text-gray-500">Configure os filtros acima e clique em "Buscar Ranking"</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default LocationNames;

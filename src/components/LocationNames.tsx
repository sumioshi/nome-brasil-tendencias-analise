import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
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
  const [customCode, setCustomCode] = useState<string>('');
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

  const validateLocationCode = (code: string): boolean => {
    const trimmedCode = code.trim();
    if (trimmedCode.length === 2 && /^\d{2}$/.test(trimmedCode)) {
      const numCode = parseInt(trimmedCode);
      return numCode >= 11 && numCode <= 99;
    }
    if (trimmedCode.length === 7 && /^\d{7}$/.test(trimmedCode)) {
      return true;
    }
    return false;
  };

  const handleSearch = async () => {
    let locationCode = '';
    let displayName = '';
    
    if (customCode.trim()) {
      locationCode = customCode.trim();
      displayName = `Código ${locationCode}`;
    } else if (filterType === 'uf' && selectedUF) {
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
      toast.error('Por favor, selecione uma localidade ou informe um código');
      return;
    }
    
    if (!validateLocationCode(locationCode)) {
      toast.error('Código inválido. Use 2 dígitos para UF (11-99) ou 7 dígitos para município');
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
    setCustomCode('');
    setRankingLimit('10');
    setStartDate(undefined);
    setEndDate(undefined);
    setRankingData([]);
    setLocationName('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ranking de Nomes por Localidade</CardTitle>
        <CardDescription>
          Consulte os nomes mais frequentes em uma localidade específica (dados consolidados de todos os períodos)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Seção: Tipo de Consulta */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">1. Escolha o tipo de consulta</Label>
            <RadioGroup 
              value={filterType} 
              onValueChange={(value) => {
                setFilterType(value as 'uf' | 'city');
                resetFilters();
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="uf" id="uf" />
                <Label htmlFor="uf" className="cursor-pointer flex-1">
                  <div className="font-medium">Por Estado (UF)</div>
                  <div className="text-sm text-gray-500">Consultar dados de um estado inteiro</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="city" id="city" />
                <Label htmlFor="city" className="cursor-pointer flex-1">
                  <div className="font-medium">Por Cidade</div>
                  <div className="text-sm text-gray-500">Consultar dados de uma cidade específica</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Seção: Seleção de Localidade */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">2. Selecione a localidade</Label>
            
            {filterType === 'uf' && (
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">Estado</Label>
                <Select onValueChange={setSelectedUF} value={selectedUF}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name} ({state.uf}) - {state.region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {filterType === 'city' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state-for-city" className="text-sm font-medium">Primeiro selecione o Estado</Label>
                  <Select onValueChange={(value) => {
                    setSelectedUF(value);
                    setSelectedCity('');
                  }} value={selectedUF}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.filter(state => citiesByState[state.code]).map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.name} ({state.uf})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedUF && (
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">Cidade</Label>
                    <Select onValueChange={setSelectedCity} value={selectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCitiesForSelectedState().map((city) => (
                          <SelectItem key={city.code} value={city.code}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Código personalizado */}
            <div className="space-y-2">
              <Label htmlFor="custom-code" className="text-sm font-medium">
                Ou digite um código IBGE personalizado
              </Label>
              <Input
                id="custom-code"
                placeholder="Ex: 33 (RJ) ou 3304557 (Rio de Janeiro)"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <p><strong>Estados:</strong> 2 dígitos (ex: 33 para RJ, 35 para SP)</p>
                <p><strong>Municípios:</strong> 7 dígitos (ex: 3304557 para Rio de Janeiro)</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Seção: Configurações do Ranking e Período */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">3. Configure o ranking e período</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quantidade de nomes no ranking */}
              <div className="space-y-2">
                <Label htmlFor="ranking-limit" className="text-sm font-medium">Quantidade de nomes no ranking</Label>
                <Select value={rankingLimit} onValueChange={setRankingLimit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
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
            </div>

            {/* Filtro de Período */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Filtro de período (opcional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Data de início */}
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Data de início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date > new Date() || (endDate && date > endDate)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Data de fim */}
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Data de fim</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date > new Date() || (startDate && date < startDate)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Botão para limpar datas */}
              {(startDate || endDate) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }}
                  className="text-xs"
                >
                  Limpar período
                </Button>
              )}
              
              <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                <p><strong>Dica:</strong> O filtro de período será aplicado aos dados disponíveis. Se não especificado, serão exibidos dados consolidados de todos os períodos.</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleSearch} 
              className="flex-1 sm:flex-none"
              disabled={loading || (!customCode.trim() && !selectedUF && !selectedCity)}
            >
              {loading ? 'Buscando...' : 'Buscar Dados'}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="flex-1 sm:flex-none"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          {loading ? (
            <Loading message="Buscando dados da localidade..." />
          ) : rankingData.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  Ranking de Nomes - {locationName}
                </h3>
                <div className="text-sm text-gray-500">
                  Mostrando top {rankingLimit} nomes
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
                <TableCaption>
                  Ranking dos {rankingLimit} nomes mais populares na localidade selecionada
                  {(startDate || endDate) && ' no período especificado'}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="w-[80px]">Ranking</TableHead>
                    <TableHead className="text-right w-[120px]">Frequência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingData[0]?.names.map((nameItem) => (
                    <TableRow key={nameItem.name}>
                      <TableCell className="font-medium">{nameItem.name}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                          {nameItem.ranking}°
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {new Intl.NumberFormat('pt-BR').format(nameItem.frequency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 border border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-medium">Nenhum dado para exibir</p>
                <p className="text-sm mt-2">Configure os filtros acima e clique em "Buscar Dados"</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationNames;

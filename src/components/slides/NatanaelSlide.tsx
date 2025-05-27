import React from 'react';
import { Users, MapPin, Database, Filter, Table, Globe, Cpu, FileText, Settings, Layers, ArrowRight, Calendar } from 'lucide-react';

const NatanaelSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full p-2 sm:p-4 text-center overflow-y-auto">
      <div className="modern-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 relative overflow-hidden w-full max-w-7xl shadow-2xl">
        {/* Card background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-green-50/70 to-teal-50/70 dark:from-slate-800/95 dark:via-slate-700/70 dark:to-slate-600/70 -z-10"></div>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-2 sm:mb-0 sm:mr-3">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 leading-tight">
              Nomes Mais Frequentes por Localidade
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-300 mt-1">
              Apresentador: <span className="font-semibold text-green-600 dark:text-green-400">Natanael Balbo</span>
            </p>
          </div>
        </div>

        {/* Arquitetura do Projeto - Estilo IDE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">

          {/* Frontend Architecture */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 text-left overflow-hidden">
            <div className="flex items-center mb-3 sm:mb-4">
              <Table className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Frontend Architecture</h3>
            </div>

            {/* File Structure */}
            <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="flex items-center text-green-300 min-w-max">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <span className="text-yellow-300">src/components/</span>
                <span className="text-green-300">LocationNames.tsx</span>
              </div>

              {/* Component Code Block */}
              <div className="bg-slate-800 rounded-lg p-2 sm:p-3 ml-3 sm:ml-6 overflow-x-auto">
                <div className="text-green-400 mb-1 sm:mb-2 text-xs sm:text-sm">// React Component</div>
                <div className="text-purple-300 min-w-max">const <span className="text-green-300">LocationNames</span> = () => {`{`}</div>
                <div className="ml-2 sm:ml-4 space-y-1 min-w-max">
                  <div className="text-orange-300 text-xs sm:text-sm">const [filterType, setFilterType] = useState&lt;'uf' | 'city'&gt;('uf');</div>
                  <div className="text-orange-300 text-xs sm:text-sm">const [selectedUF, setSelectedUF] = useState&lt;string&gt;('');</div>
                  <div className="text-orange-300 text-xs sm:text-sm">const [rankingData, setRankingData] = useState&lt;RankingData[]&gt;([]);</div>
                  <div className="text-orange-300 text-xs sm:text-sm">const [loading, setLoading] = useState&lt;boolean&gt;(false);</div>
                </div>
                <div className="text-purple-300 min-w-max">{`}`}</div>
              </div>

              {/* Service Layer */}
              <div className="flex items-center text-teal-300 mt-3 sm:mt-4 min-w-max">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <span className="text-yellow-300">src/services/</span>
                <span className="text-teal-300">ibgeService.ts</span>
              </div>

              <div className="bg-slate-800 rounded-lg p-2 sm:p-3 ml-3 sm:ml-6 overflow-x-auto">
                <div className="text-green-400 mb-1 sm:mb-2 text-xs sm:text-sm">// API Service</div>
                <div className="text-blue-300 min-w-max">export const <span className="text-yellow-300">getNameRankingByLocation</span> = async (</div>
                <div className="ml-2 sm:ml-4 min-w-max">
                  <div className="text-orange-300 text-xs sm:text-sm">location: string</div>
                </div>
                <div className="text-blue-300 min-w-max">) => Promise&lt;NameRanking[]&gt;</div>
              </div>
            </div>
          </div>

          {/* Backend/API Architecture */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-5 text-left">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-white">API & Location Data</h3>
            </div>

            {/* API Endpoint */}
            <div className="space-y-3 font-mono text-sm">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-green-400 mb-2">// IBGE Ranking API</div>
                <div className="text-blue-300">GET <span className="text-yellow-300">/api/v2/censos/nomes/ranking</span></div>
                <div className="text-purple-300">?localidade=<span className="text-orange-300">{`{codigo_IBGE}`}</span></div>
              </div>

              {/* Location Codes */}
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-green-400 mb-2">// Códigos IBGE</div>
                <div className="text-orange-300">UF: <span className="text-blue-300">2 dígitos</span> (ex: 35 = SP)</div>
                <div className="text-orange-300">Município: <span className="text-blue-300">7 dígitos</span> (ex: 3550308 = SP Capital)</div>
              </div>

              {/* Data Structure */}
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-green-400 mb-2">// Response Structure</div>
                <div className="text-purple-300">interface <span className="text-blue-300">NameRanking</span> {`{`}</div>
                <div className="ml-4 space-y-1">
                  <div className="text-orange-300">localidade: string;</div>
                  <div className="text-orange-300">sexo: string | null;</div>
                  <div className="text-orange-300">res: Array&lt;{`{`}</div>
                  <div className="ml-4 space-y-1">
                    <div className="text-yellow-300">nome: string;</div>
                    <div className="text-yellow-300">frequencia: number;</div>
                    <div className="text-yellow-300">ranking: number;</div>
                  </div>
                  <div className="text-orange-300">{`}>`};</div>
                </div>
                <div className="text-purple-300">{`}`}</div>
              </div>

              {/* Data Processing */}
              <div className="flex items-center text-purple-300">
                <Cpu className="w-4 h-4 mr-2" />
                <span className="text-yellow-300">src/services/</span>
                <span className="text-purple-300">nameService.ts</span>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-green-400 mb-2">// Data Processing</div>
                <div className="text-blue-300">export const <span className="text-yellow-300">processNameRankingData</span> = (</div>
                <div className="ml-4 text-orange-300">data: NameRanking[]</div>
                <div className="text-blue-300">) => RankingData[]</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e UI Components */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Filter className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Sistema de Filtros Avançados</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 text-green-600 mr-2" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Tipo de Localidade</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-green-600">• RadioGroup: UF | Cidade</div>
                <div className="text-green-600">• Select: Estados/Municípios</div>
                <div className="text-green-600">• Cascata: Estado → Cidade</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Filtros Temporais</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-blue-600">• Calendar: Data início/fim</div>
                <div className="text-blue-600">• Popover: Seletor de datas</div>
                <div className="text-blue-600">• date-fns: Formatação PT-BR</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Table className="w-4 h-4 text-purple-600 mr-2" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Controle de Resultados</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-purple-600">• Select: Top 3, 5, 10, 20</div>
                <div className="text-purple-600">• Table: shadcn/ui components</div>
                <div className="text-purple-600">• Pagination: Controle de dados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Flow Diagram */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Fluxo de Dados Detalhado</h3>
          </div>

          <div className="flex flex-wrap justify-center items-center space-x-2 text-sm md:text-base">
            <div className="bg-green-100 dark:bg-green-900 px-3 py-2 rounded-lg font-mono">
              <strong>Seleção:</strong> UF/Cidade + Filtros
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-lg font-mono">
              <strong>getNameRankingByLocation()</strong>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded-lg font-mono">
              <strong>API Ranking IBGE</strong>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-orange-100 dark:bg-orange-900 px-3 py-2 rounded-lg font-mono">
              <strong>processNameRankingData()</strong>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-teal-100 dark:bg-teal-900 px-3 py-2 rounded-lg font-mono">
              <strong>Table Ranking</strong>
            </div>
          </div>
        </div>

        {/* Estados e Validações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Layers className="w-5 h-5 text-green-400 mr-2" />
              <h4 className="text-lg font-bold text-white">Estados React</h4>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-orange-300">filterType: <span className="text-blue-300">'uf' | 'city'</span></div>
              <div className="text-orange-300">selectedUF: <span className="text-blue-300">string</span></div>
              <div className="text-orange-300">selectedCity: <span className="text-blue-300">string</span></div>
              <div className="text-orange-300">rankingData: <span className="text-blue-300">RankingData[]</span></div>
              <div className="text-orange-300">loading: <span className="text-blue-300">boolean</span></div>
              <div className="text-orange-300">startDate: <span className="text-blue-300">Date | undefined</span></div>
              <div className="text-orange-300">endDate: <span className="text-blue-300">Date | undefined</span></div>
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Globe className="w-5 h-5 text-teal-400 mr-2" />
              <h4 className="text-lg font-bold text-white">Cobertura Geográfica</h4>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-teal-300">✓ 26 Estados + DF</div>
              <div className="text-teal-300">✓ 5.570 Municípios</div>
              <div className="text-teal-300">✓ Códigos IBGE padronizados</div>
              <div className="text-teal-300">✓ Dados regionais agregados</div>
              <div className="text-teal-300">✓ Filtros temporais opcionais</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NatanaelSlide;

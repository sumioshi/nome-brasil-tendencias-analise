import React from 'react';
import { Presentation, BarChart, Database, GitCompare, Globe, Cpu, FileText, Settings, Layers, ArrowRight, Zap, RefreshCw } from 'lucide-react';

const ViniciusSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full p-2 sm:p-4 text-center overflow-y-auto">
      <div className="modern-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 relative overflow-hidden w-full max-w-7xl shadow-2xl">
        {/* Card background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-orange-50/70 to-red-50/70 dark:from-slate-800/95 dark:via-slate-700/70 dark:to-slate-600/70 -z-10"></div>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-2 sm:mb-0 sm:mr-3">
            <Presentation className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 leading-tight">
              Comparação de Dois Nomes
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-300 mt-1">
              Apresentador: <span className="font-semibold text-orange-600 dark:text-orange-400">Vinicius Santa Rosa</span>
            </p>
          </div>
        </div>

        {/* Arquitetura do Projeto - Estilo IDE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Frontend Architecture */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-5 text-left">
            <div className="flex items-center mb-4">
              <BarChart className="w-5 h-5 text-orange-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Frontend Architecture</h3>
            </div>

            {/* File Structure */}
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center text-orange-300">
                <FileText className="w-4 h-4 mr-2" />
                <span className="text-yellow-300">src/components/</span>
                <span className="text-orange-300">NameComparison.tsx</span>
              </div>

              {/* Component Code Block */}
              <div className="bg-slate-800 rounded-lg p-3 ml-6">
                <div className="text-green-400 mb-2">// React Component</div>
                <div className="text-purple-300">const <span className="text-orange-300">NameComparison</span> = () =&gt; {`{`}</div>
                <div className="ml-4 space-y-1">
                  <div className="text-orange-300">const [name1, setName1] = useState&lt;string&gt;('');</div>
                  <div className="text-orange-300">const [name2, setName2] = useState&lt;string&gt;('');</div>
                  <div className="text-orange-300">const [chartData, setChartData] = useState&lt;any[]&gt;([]);</div>
                  <div className="text-orange-300">const [loading, setLoading] = useState&lt;boolean&gt;(false);</div>
                </div>
                <div className="text-purple-300">{`}`}</div>
              </div>

              {/* Service Layer */}
              <div className="flex items-center text-red-300 mt-4">
                <Settings className="w-4 h-4 mr-2" />
                <span className="text-yellow-300">src/services/</span>
                <span className="text-red-300">ibgeService.ts</span>
              </div>

              <div className="bg-slate-800 rounded-lg p-3 ml-6">
                <div className="text-green-400 mb-2">// API Service</div>
                <div className="text-blue-300">export const <span className="text-yellow-300">getNameFrequency</span> = async (</div>
                <div className="ml-4">
                  <div className="text-orange-300">name: string</div>
                </div>
                <div className="text-blue-300">) =&gt; Promise&lt;NameFrequency[]&gt;</div>
              </div>
            </div>
          </div>

          {/* Backend/API Architecture */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-5 text-left">
            <div className="flex items-center mb-4">
              <GitCompare className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Parallel Processing</h3>
            </div>

            {/* API Strategy */}
            <div className="space-y-3 font-mono text-sm">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-green-400 mb-2">// Parallel API Calls</div>
                <div className="text-blue-300">const [response1, response2] = await <span className="text-yellow-300">Promise.all</span>([</div>
                <div className="ml-4 space-y-1">
                  <div className="text-orange-300">getNameFrequency(name1),</div>
                  <div className="text-orange-300">getNameFrequency(name2)</div>
                </div>
                <div className="text-blue-300">]);</div>
              </div>

              {/* Data Merging Algorithm */}
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-green-400 mb-2">// Data Merge Algorithm</div>
                <div className="text-purple-300">processedData1[0].data.<span className="text-yellow-300">forEach</span>((item) =&gt; {`{`}</div>
                <div className="ml-4 space-y-1">
                  <div className="text-orange-300">const matchingItem = processedData2[0].data</div>
                  <div className="text-orange-300">  .<span className="text-yellow-300">find</span>(i =&gt; i.period === item.period);</div>
                  <div className="text-blue-300">mergedData.<span className="text-yellow-300">push</span>({`{`}</div>
                  <div className="ml-4 space-y-1">
                    <div className="text-green-300">period: item.period,</div>
                    <div className="text-green-300">[name1]: item.frequency,</div>
                    <div className="text-green-300">[name2]: matchingItem?.frequency || 0</div>
                  </div>
                  <div className="text-blue-300">{`});`}</div>
                </div>
                <div className="text-purple-300">{`});`}</div>
              </div>

              {/* Data Processing */}
              <div className="flex items-center text-purple-300">
                <Cpu className="w-4 h-4 mr-2" />
                <span className="text-yellow-300">src/services/</span>
                <span className="text-purple-300">nameService.ts</span>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-green-400 mb-2">// Data Transformation</div>
                <div className="text-blue-300">export const <span className="text-yellow-300">processNameFrequencyData</span> = (</div>
                <div className="ml-4 text-orange-300">data: NameFrequency[]</div>
                <div className="text-blue-300">) =&gt; ProcessedNameData[]</div>
              </div>
            </div>
          </div>
        </div>

        {/* Algoritmo de Merge Detalhado */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Algoritmo de Merge Avançado</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Zap className="w-4 h-4 text-orange-600 mr-2" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200">1. Promise.all</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-orange-600">• Requisições paralelas</div>
                <div className="text-orange-600">• Otimização de performance</div>
                <div className="text-orange-600">• Tratamento de erros</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Database className="w-4 h-4 text-blue-600 mr-2" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200">2. Data Processing</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-blue-600">• processNameFrequencyData()</div>
                <div className="text-blue-600">• Normalização individual</div>
                <div className="text-blue-600">• Formatação de períodos</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <GitCompare className="w-4 h-4 text-purple-600 mr-2" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200">3. Data Merge</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-purple-600">• forEach + find</div>
                <div className="text-purple-600">• Sincronização por período</div>
                <div className="text-purple-600">• Fallback para dados ausentes</div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <BarChart className="w-4 h-4 text-green-600 mr-2" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200">4. Visualization</h4>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-green-600">• Recharts BarChart</div>
                <div className="text-green-600">• Cores distintas</div>
                <div className="text-green-600">• Tooltip interativo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Flow Diagram */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Fluxo de Dados Detalhado</h3>
          </div>

          <div className="flex flex-wrap justify-center items-center space-x-2 text-sm md:text-base">
            <div className="bg-orange-100 dark:bg-orange-900 px-3 py-2 rounded-lg font-mono">
              <strong>Input:</strong> nome1 + nome2
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-lg font-mono">
              <strong>Promise.all([API1, API2])</strong>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded-lg font-mono">
              <strong>processNameFrequencyData()</strong>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-green-100 dark:bg-green-900 px-3 py-2 rounded-lg font-mono">
              <strong>Merge Algorithm</strong>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600" />
            <div className="bg-red-100 dark:bg-red-900 px-3 py-2 rounded-lg font-mono">
              <strong>BarChart Comparativo</strong>
            </div>
          </div>
        </div>

        {/* Estados e Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Layers className="w-5 h-5 text-orange-400 mr-2" />
              <h4 className="text-lg font-bold text-white">Estados React</h4>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-orange-300">name1: <span className="text-blue-300">string</span></div>
              <div className="text-orange-300">name2: <span className="text-blue-300">string</span></div>
              <div className="text-orange-300">chartData: <span className="text-blue-300">any[]</span></div>
              <div className="text-orange-300">loading: <span className="text-blue-300">boolean</span></div>
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Zap className="w-5 h-5 text-red-400 mr-2" />
              <h4 className="text-lg font-bold text-white">Performance</h4>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-red-300">✓ Requisições paralelas</div>
              <div className="text-red-300">✓ Merge eficiente O(n)</div>
              <div className="text-red-300">✓ Fallback para dados ausentes</div>
              <div className="text-red-300">✓ Validação de entrada</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViniciusSlide;

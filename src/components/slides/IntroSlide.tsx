import React from 'react';
import { Users, BarChart3, MapPin, Database, Code, Globe, Cpu, TrendingUp } from 'lucide-react';

const IntroSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="modern-card rounded-3xl p-8 relative overflow-hidden w-full max-w-6xl shadow-2xl">
        {/* Card background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/70 to-purple-50/70 dark:from-slate-800/95 dark:via-slate-700/70 dark:to-slate-600/70 -z-10"></div>
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            Sistema de Análise de Tendências de Nomes
          </h1>
          <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 font-medium">
            Dados fornecidos pela API do IBGE
          </p>
        </div>

        {/* Equipe */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">Equipe de Desenvolvimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6">
              <div className="flex items-center justify-center mb-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Rodrigo Sumioshi</h3>
              <p className="text-slate-600 dark:text-slate-400">220141912</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-2">Evolução de Nomes</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-2xl p-6">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Natanael Balbo</h3>
              <p className="text-slate-600 dark:text-slate-400">220141852</p>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-2">Nomes por Localidade</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl p-6">
              <div className="flex items-center justify-center mb-3">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Vinicius Santa Rosa</h3>
              <p className="text-slate-600 dark:text-slate-400">240421212</p>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mt-2">Comparação de Nomes</p>
            </div>
          </div>
        </div>

        {/* Tecnologias */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">Stack Tecnológico</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 dark:bg-slate-700/80 rounded-xl p-4 text-center">
              <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200">React</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Frontend</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-700/80 rounded-xl p-4 text-center">
              <Database className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200">TypeScript</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tipagem</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-700/80 rounded-xl p-4 text-center">
              <Globe className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200">API IBGE</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Dados</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-700/80 rounded-xl p-4 text-center">
              <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Recharts</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Gráficos</p>
            </div>
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Evolução Temporal</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Análise da popularidade de nomes ao longo das décadas com gráficos interativos
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/40 dark:to-teal-900/40 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Análise Regional</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Rankings de nomes mais populares por estado e município brasileiro
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Comparação</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Comparação direta entre dois nomes com visualização lado a lado
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Navegue pelos slides para conhecer cada funcionalidade em detalhes
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;

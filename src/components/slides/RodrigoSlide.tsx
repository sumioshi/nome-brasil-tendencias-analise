import React from 'react';

const RodrigoSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="modern-card rounded-2xl p-8 relative overflow-hidden w-full max-w-2xl">
        {/* Card background gradient (similar to Index.tsx) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/50 dark:from-slate-800/90 dark:via-slate-700/50 dark:to-slate-600/50 -z-10"></div>
        
        <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Evolução do Ranking de um Nome
        </h1>
        
        <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
          Apresentador: Rodrigo
        </p>
        
        <div className="space-y-4 text-slate-600 dark:text-slate-400">
          <p>
            Esta funcionalidade permite ao usuário analisar como a popularidade de um nome variou ao longo do tempo.
          </p>
          <p>
            O usuário informa um nome de interesse e define um intervalo de décadas para análise (por exemplo, de 1970 a 2000).
          </p>
          <p>
            O sistema então processa esses dados e exibe a evolução do ranking do nome no período especificado, geralmente utilizando um gráfico de linhas ou barras para facilitar a visualização da tendência.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RodrigoSlide;

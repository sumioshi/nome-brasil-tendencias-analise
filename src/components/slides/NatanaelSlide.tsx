import React from 'react';

const NatanaelSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="modern-card rounded-2xl p-8 relative overflow-hidden w-full max-w-2xl">
        {/* Card background gradient (similar to Index.tsx and RodrigoSlide.tsx) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-green-50/50 to-teal-50/50 dark:from-slate-800/90 dark:via-slate-700/50 dark:to-slate-600/50 -z-10"></div>
        
        <h1 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
          Nomes Mais Frequentes por Localidade
        </h1>
        
        <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
          Apresentador: Natanael
        </p>
        
        <div className="space-y-4 text-slate-600 dark:text-slate-400">
          <p>
            Esta funcionalidade permite ao usuário descobrir os nomes mais populares em uma localidade específica ao longo do tempo.
          </p>
          <p>
            O usuário começa selecionando uma localidade de interesse, que pode ser um estado (UF) ou um município.
          </p>
          <p>
            Após a seleção, o sistema exibe os três (3) nomes mais frequentes para essa localidade, mostrando sua popularidade através das décadas. Os dados são apresentados em formato de tabela para fácil comparação e análise.
          </p>
          <p className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700">
            <strong>Comunicação com o Backend:</strong><br />
            No backend, esta funcionalidade interage com um serviço que aceita o identificador da localidade (UF ou município). Esse serviço busca no banco de dados os nomes mais frequentes para essa localidade em diferentes décadas e os retorna. A interface de comunicação é uma API REST, com um endpoint similar a: <code>GET /api/localidade/{'{id_localidade}'}/top-nomes</code>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NatanaelSlide;

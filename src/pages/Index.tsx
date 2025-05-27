
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import NameEvolution from '@/components/NameEvolution';
import LocationNames from '@/components/LocationNames';
import NameComparison from '@/components/NameComparison';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("evolution");

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto py-8 px-4 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 -z-10"></div>
          
          <div className="modern-card rounded-2xl p-8 relative overflow-hidden">
            {/* Card background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/50 dark:from-slate-800/90 dark:via-slate-700/50 dark:to-slate-600/50 -z-10"></div>
            
            <Tabs defaultValue="evolution" value={activeTab} onValueChange={setActiveTab}>
              <div className="mb-8">
                <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 bg-gradient-to-r from-slate-100 via-blue-50 to-purple-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 p-1 rounded-xl border border-white/20 dark:border-slate-600/30">
                  <TabsTrigger 
                    value="evolution"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300"
                  >
                    Evolução do Nome
                  </TabsTrigger>
                  <TabsTrigger 
                    value="location"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300"
                  >
                    Nomes por Localidade
                  </TabsTrigger>
                  <TabsTrigger 
                    value="comparison"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300"
                  >
                    Comparação de Nomes
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="evolution" className="space-y-6">
                <NameEvolution />
              </TabsContent>
              
              <TabsContent value="location" className="space-y-6">
                <LocationNames />
              </TabsContent>
              
              <TabsContent value="comparison" className="space-y-6">
                <NameComparison />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            <p className="font-medium">
              Sistema de Análise de Tendência de Nomes &copy; {new Date().getFullYear()}
            </p>
            <p className="mt-1">
              Dados fornecidos pela API pública do Instituto Brasileiro de Geografia e Estatística (IBGE)
            </p>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;

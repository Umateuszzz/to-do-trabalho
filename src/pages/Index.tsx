"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold text-slate-800">Bem-vindo</h1>
        <p className="text-slate-600">Projeto web com React e shadcn/ui</p>
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">🚀 App Pronto</CardTitle>
            <CardDescription>
              Clique nos botões para explorar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Começar</Button>
            <Button variant="outline" className="w-full">Saiba Mais</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
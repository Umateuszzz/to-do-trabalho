"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Sobre = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Sobre Nós</CardTitle>
          <CardDescription>
            Conheça mais sobre este projeto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Este é um projeto web moderno desenvolvido com as melhores práticas 
            de desenvolvimento frontend, utilizando tecnologias de ponta para 
            garantir performance e experiência do usuário excepcionais.
          </p>
          <p className="text-slate-600">
            Nossa stack inclui React, TypeScript, Tailwind CSS e shadcn/ui, 
            proporcionando uma base sólida para construção de aplicações escaláveis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sobre;
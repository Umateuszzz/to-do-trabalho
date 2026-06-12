"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Contato</CardTitle>
          <CardDescription>
            Envie sua mensagem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" placeholder="Sua mensagem..." rows={5} />
            </div>
            <Button type="submit" className="w-full">Enviar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
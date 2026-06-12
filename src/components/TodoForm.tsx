"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TodoFormProps {
  onAddTodo: (titulo: string, descricao: string) => void;
  className?: string;
}

export const TodoForm = ({ onAddTodo, className = "" }: TodoFormProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    setIsLoading(true);
    try {
      onAddTodo(titulo, descricao);
      setTitulo("");
      setDescricao("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Nova Tarefa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva a tarefa (opcional)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={isLoading || !titulo.trim()}
          >
            {isLoading ? "Adicionando..." : "Adicionar Tarefa"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
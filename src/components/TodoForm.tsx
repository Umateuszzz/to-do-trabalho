"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Save } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (titulo: string, descricao: string) => void;
  onEditTodo?: (id: string, titulo: string, descricao: string) => void;
  editTodo?: { id: string; titulo: string; descricao: string } | null;
  className?: string;
}

export const TodoForm = ({ onAddTodo, onEditTodo, editTodo, className = "" }: TodoFormProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (editTodo) {
      setTitulo(editTodo.titulo);
      setDescricao(editTodo.descricao || "");
      setIsOpen(true);
    }
  }, [editTodo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    if (editTodo && onEditTodo) {
      onEditTodo(editTodo.id, titulo, descricao);
    } else {
      onAddTodo(titulo, descricao);
    }

    setTitulo("");
    setDescricao("");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTitulo("");
    setDescricao("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className={`bg-blue-600 text-white hover:bg-blue-700 ${className}`}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editTodo ? "Editar Tarefa" : "Nova Tarefa"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              autoFocus
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
              className="resize-none"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {editTodo ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Edit, Trash2, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface TodoCardProps {
  todo: {
    id: string;
    titulo: string;
    descricao: string;
    concluida: boolean;
    created_at: string;
  };
  onToggleTodo: (id: string, concluida: boolean) => void;
  onEditTodo: (id: string, titulo: string, descricao: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoCard = ({
  todo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: TodoCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={todo.concluida}
              onCheckedChange={(checked) => {
                console.log("Checkbox changed:", todo.id, checked);
                onToggleTodo(todo.id, checked as boolean);
              }}
              className="h-4 w-4"
            />
            <div className="flex-1">
              <h3 className={todo.concluida ? "line-through text-gray-500 text-lg" : "font-medium text-lg"}>
                {todo.titulo}
              </h3>
              {todo.descricao && (
                <CardDescription className="mt-1 text-sm text-gray-500">
                  {todo.descricao}
                </CardDescription>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <Menu className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEditTodo(todo.id, todo.titulo, todo.descricao)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteTodo(todo.id)} className="text-red-500">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-gray-400">
          Criado em: {formatDate(todo.created_at)}
        </p>
      </CardContent>
    </Card>
  );
};
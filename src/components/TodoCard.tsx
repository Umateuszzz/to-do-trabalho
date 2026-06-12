"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface TodoCardProps {
  todo: any;
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
    <Card className="border">
      <CardHeader className="flex items-center space-x-3">
        <Checkbox
          checked={todo.concluida}
          onCheckedChange={(checked) => onToggleTodo(todo.id, checked)}
          className="h-4 w-4"
        />
        <div className="flex-1">
          <h3 className={todo.concluida ? "line-through text-gray-500" : "font-medium"}>
            {todo.titulo}
          </h3>
          {todo.descricao && (
            <CardDescription className="mt-1 text-sm text-gray-500">
              {todo.descricao}
            </CardDescription>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">{formatDate(todo.created_at)}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="p-1">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEditTodo(todo.id, todo.titulo, todo.descricao)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteTodo(todo.id)} className="text-red-500">
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
};
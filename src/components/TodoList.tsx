"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash2, MoreVertical } from "lucide-react";

interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  created_at: string;
}

interface TodoListProps {
  todos: Todo[];
  onStatusChange: (id: string, newStatus: boolean) => Promise<void>;
  onEditTodo: (id: string, titulo: string, descricao: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, onStatusChange, onEditTodo, onDeleteTodo }: TodoListProps) => {
  const handleToggle = async (todo: Todo) => {
    console.log("Tarefa clicada:", todo.id);
    console.log("Status atual:", todo.concluida);
    console.log("Novo status:", !todo.concluida);
    await onStatusChange(todo.id, !todo.concluida);
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h5.5a2 2 0 002-2V9a2 2 0 00-2-2H9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z" />
        </svg>
        <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
        <p className="text-gray-400 text-sm mt-2">Adicione sua primeira tarefa acima para começar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <Card key={todo.id} className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className={todo.concluida ? "line-through text-gray-500 text-lg" : "font-medium text-lg"}>
                  {todo.titulo}
                </CardTitle>
                {todo.descricao && (
                  <CardDescription className="mt-1 text-sm text-gray-500">
                    {todo.descricao}
                  </CardDescription>
                )}
              </div>
              <span
                className={
                  todo.concluida
                    ? "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    : "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                }
              >
                {todo.concluida ? "✅ Concluída" : "⏳ Pendente"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-xs text-gray-400">
            <div>
              <Calendar className="h-3 w-3 mr-1 inline" />
              {new Date(todo.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
            <button
              onClick={() => handleToggle(todo)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium"
            >
              {todo.concluida ? "Reabrir" : "Concluir"}
              <RefreshCw className="h-3 w-3" />
            </button>
          </CardContent>

          {/* Editar / Excluir dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1 h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onEditTodo(todo.id, todo.titulo, todo.descricao)} className="flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteTodo(todo.id)} className="flex items-center">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      ))}
    </div>
  );
};
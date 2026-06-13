"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckSquare, Calendar, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
}

export const TodoList = ({ todos, onStatusChange }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
        <p className="text-gray-400 text-sm mt-2">Adicione sua primeira tarefa acima para começar!</p>
      </div>
    );
  }

  const handleToggle = async (todo: Todo) => {
    await onStatusChange(todo.id, !todo.concluida);
  };

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
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              {todo.concluida ? "Reabrir" : "Concluir"}
              <RefreshCw className="h-3 w-3" />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
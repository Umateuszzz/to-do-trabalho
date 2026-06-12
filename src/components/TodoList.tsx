"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckSquare, Calendar } from "lucide-react";

interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  created_at: string;
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <CheckSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        </div>
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
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex items-center space-x-3">
                  <div className={todo.concluida ? "text-green-500" : "text-gray-400"}>
                    <CheckSquare className="h-5 w-5" />
                  </div>
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                <Calendar className="h-3 w-3 inline mr-1" />
                Criado em: {new Date(todo.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className={todo.concluida ? "text-green-600" : "text-yellow-600"}>
                {todo.concluida ? "Concluída" : "Pendente"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
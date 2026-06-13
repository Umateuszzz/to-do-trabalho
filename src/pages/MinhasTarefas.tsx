"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Calendar, ArrowLeft, RefreshCw } from "lucide-react";

interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  created_at: string;
}

export default function MinhasTarefas() {
  const { user, loading } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (!error && data) setTodos(data);
  };

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    if (!user) return;
    const { error } = await supabase
      .from("todos")
      .update({ concluida: newStatus })
      .eq("id", id)
      .eq("user_id", user.id);
    if (!error) fetchTodos();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Redirecionando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Home
            </Link>
          </Button>
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CheckSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            </div>
            <p className="text-gray-500 text-lg">Você ainda não possui tarefas cadastradas.</p>
            <Button asChild className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
              <Link to="/nova-tarefa">Nova Tarefa</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
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
                    onClick={() => handleStatusChange(todo.id, !todo.concluida)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    {todo.concluida ? "Reabrir" : "Concluir"}
                    <RefreshCw className="h-3 w-3" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
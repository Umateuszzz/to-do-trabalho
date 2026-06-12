"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { LogOut, CheckSquare, Clock, Calendar } from "lucide-react";

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState<{ id: string; titulo: string; descricao: string } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data || []);
      }
      setLoading(false);
    };

    fetchTodos();

    const channel = supabase
      .channel("todos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos", filter: `user_id=eq.${user.id}` },
        () => {
          fetchTodos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, navigate]);

  const handleAddTodo = async (titulo: string, descricao: string) => {
    const { error } = await supabase.from("todos").insert([
      { titulo, descricao, user_id: user.id },
    ]);

    if (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleTodo = async (id: string, concluida: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ concluida: !concluida })
      .eq("id", id);

    if (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleEditTodo = async (id: string, titulo: string, descricao: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ titulo, descricao })
      .eq("id", id);

    if (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditClick = (todo: { id: string; titulo: string; descricao: string }) => {
    setEditTodo(todo);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.concluida).length;
  const pendingTodos = totalTodos - completedTodos;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Meu To Do</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                    <CheckSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-800">{totalTodos}</p>
                  <p className="text-sm text-blue-600">Total</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <CheckSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-800">{completedTodos}</p>
                  <p className="text-sm text-green-600">Concluídas</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-800">{pendingTodos}</p>
                  <p className="text-sm text-yellow-600">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <TodoForm
            onAddTodo={handleAddTodo}
            onEditTodo={handleEditTodo}
            editTodo={editTodo}
          />
        </div>

        <div>
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onEditTodo={handleEditClick}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
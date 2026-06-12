"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.concluida).length;
  const pendingTodos = totalTodos - completedTodos;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meu To Do</h1>
        <div className="space-x-4">
          <Button onClick={() => signOut().then(() => navigate("/login"))} className="text-gray-500 hover:text-gray-700">
            Sair
          </Button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-blue-50">
            <CardContent className="text-center">
              <p className="text-sm text-blue-600">Total</p>
              <p className="text-2xl font-bold text-blue-800">{totalTodos}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="text-center">
              <p className="text-sm text-green-600">Concluídas</p>
              <p className="text-2xl font-bold text-green-800">{completedTodos}</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="text-center">
              <p className="text-sm text-yellow-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-800">{pendingTodos}</p>
            </CardContent>
          </Card>
        </div>

        <TodoForm
          onAddTodo={handleAddTodo}
          className="mb-6"
        />

        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onEditTodo={handleEditTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
};

export default Home;
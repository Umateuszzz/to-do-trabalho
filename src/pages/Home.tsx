"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { CheckSquare, Link } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogActions,
  DialogButton,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  created_at: string;
}

export default function Home() {
  const { user, loading } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTodos = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error && data) setTodos(data);
  };

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const handleAddTodo = async (titulo: string, descricao: string) => {
    if (!user) return;
    const { error } = await supabase
      .from("todos")
      .insert({ titulo, descricao, user_id: user.id, concluida: false });
    if (!error) fetchTodos();
  };

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    console.log("handleStatusChange chamado");
    console.log("ID:", id);
    console.log("Novo status:", newStatus);
    console.log("Usuário:", user?.id);

    if (!user) {
      console.log("Usuário não autenticado");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ concluida: newStatus })
        .eq("id", id)
        .eq("user_id", user.id)
        .select();

      console.log("Resultado da atualização:", data);
      
      if (error) {
        console.log("Erro no Supabase:", error);
        return;
      }

      // Atualiza a lista após sucesso
      await fetchTodos();
    } catch (err) {
      console.log("Erro inesperado:", err);
    }
  };

  const handleEditTodo = (id: string, titulo: string, descricao: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setEditingTodo(todo);
      setEditTitle(titulo);
      setEditDesc(descricao);
      setIsEditOpen(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingTodo || !user) return;
    setIsEditOpen(false);
    try {
      const { error } = await supabase
        .from("todos")
        .update({ titulo: editTitle, descricao: editDesc })
        .eq("id", editingTodo.id)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.log("Erro ao editar:", error);
        alert("Erro ao editar tarefa");
      } else {
        await fetchTodos();
      }
    } catch (err) {
      console.log("Erro inesperado ao editar:", err);
      alert("Erro ao editar");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!user) return;
    
    const confirmed = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        console.log("Erro ao excluir:", error);
        alert("Erro ao excluir tarefa");
      } else {
        await fetchTodos();
      }
    } catch (err) {
      console.log("Erro inesperado ao excluir:", err);
      alert("Erro ao excluir");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Redirecionando...</div>;
  }

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.concluida).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Meu To Do</h1>
          </div>
          <Link
            to="/minhas-tarefas"
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            Minhas Tarefas
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <Card>
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
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-yellow-800">{pendingTodos}</p>
                  <p className="text-sm text-yellow-600">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <TodoForm onAddTodo={handleAddTodo} />
        </div>

        <div>
          <TodoList 
            todos={todos} 
            onStatusChange={handleStatusChange} 
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </main>

      {/* Modal de Edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
            <DialogDescription>
              Altere o título e a descrição da tarefa.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-titulo">Título</Label>
              <Input
                id="edit-titulo"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Digite o título da tarefa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-descricao">Descrição</Label>
              <Textarea
                id="edit-descricao"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Descreva a tarefa"
                rows={3}
              />
            </div>
          </div>
          <DialogActions>
            <DialogButton variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </DialogButton>
            <DialogButton onClick={handleSaveEdit}>
              Salvar Alterações
            </DialogButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
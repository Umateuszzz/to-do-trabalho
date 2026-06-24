import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogActions,
  DialogButton,
} from '@/components/ui/dialog';
import { CheckSquare } from 'lucide-react';
import { TodoList } from '@/components/TodoList';
import { TodoForm } from '@/components/TodoForm';

interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  created_at: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTodos = async () => {
    if (!user) return;

    const { data, error: supabaseError } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (supabaseError) {
      console.error('Erro ao buscar tarefas:', supabaseError);
      return;
    }

    setTodos(data || []);
  };

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const handleAddTodo = async (titulo: string, descricao: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('todos')
      .insert({ titulo, descricao, user_id: user.id, concluida: false });

    if (error) {
      setError('Erro ao salvar tarefa. Tente novamente.');
    } else {
      setSuccess('Tarefa adicionada com sucesso!');
      setTimeout(() => {
        setSuccess('');
        navigate('/home');
      }, 2000);
    }
  };

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ concluida: newStatus })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTodos(prev =>
        prev.map(t =>
          t.id === id ? { ...t, concluida: newStatus } : t
        )
      );
    } catch {
      setError('Erro ao atualizar a tarefa. Tente novamente.');
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

  // ✅ CONFIRMAÇÃO ANTES DE SALVAR EDIÇÃO
  const handleSaveEdit = async () => {
    if (!editingTodo || !user) return;

    const confirmEdit = window.confirm(
      'Deseja salvar as alterações desta tarefa?'
    );

    if (!confirmEdit) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({
          titulo: editTitle,
          descricao: editDesc,
        })
        .eq('id', editingTodo.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTodos(prev =>
        prev.map(t =>
          t.id === editingTodo.id
            ? { ...t, titulo: editTitle, descricao: editDesc }
            : t
        )
      );

      setSuccess('Tarefa atualizada com sucesso!');

      setTimeout(() => {
        setSuccess('');
        setIsEditOpen(false);
      }, 2000);
    } catch {
      setError('Erro ao atualizar a tarefa. Tente novamente.');
    }
  };

  // ✅ CONFIRMAÇÃO ANTES DE EXCLUIR
  const handleDeleteTodo = async (id: string) => {
    if (!user) return;

    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta tarefa? Essa ação não pode ser desfeita.'
    );

    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchTodos();
      setSuccess('Tarefa excluída com sucesso!');

      setTimeout(() => setSuccess(''), 2000);
    } catch {
      setError('Erro ao excluir a tarefa. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl font-bold">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Meu To Do</h1>
            <Link to="/minhas-tarefas" className="text-sm text-blue-600 hover:underline">
              Minhas Tarefas
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: {todos.length}</p>
            <p>Concluídas: {todos.filter(t => t.concluida).length}</p>
            <p>Pendentes: {todos.filter(t => !t.concluida).length}</p>
          </CardContent>
        </Card>

        <TodoForm onAddTodo={handleAddTodo} className="mb-6" />

        <TodoList
          todos={todos}
          onStatusChange={handleStatusChange}
          onEditTodo={handleEditTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </main>

      {/* MODAL DE EDIÇÃO */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
            <DialogDescription>
              Altere o título e a descrição da tarefa.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
              />
            </div>
          </div>

          <DialogActions>
            <DialogButton variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </DialogButton>
            <DialogButton onClick={handleSaveEdit}>
              Salvar
            </DialogButton>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* FEEDBACK */}
      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded">
          {success}
        </div>
      )}
    </div>
  );
};

export default Home;
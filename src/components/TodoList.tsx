"use client";

import { TodoCard } from "@/components/TodoCard";

interface TodoListProps {
  todos: Array<{
    id: string;
    titulo: string;
    descricao: string;
    concluida: boolean;
    created_at: string;
  }>;
  onToggleTodo: (id: string, concluida: boolean) => void;
  onEditTodo: (id: string, titulo: string, descricao: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList = ({
  todos,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h5.5a2 2 0 002-2v-2m-6-6l2 2m0 0l2-2m-2-2v5" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
        <p className="text-gray-400 text-sm mt-2">Adicione uma nova tarefa para começar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
};
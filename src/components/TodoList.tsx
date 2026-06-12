"use client";

import { TodoCard } from "@/components/TodoCard";

interface TodoListProps {
  todos: any[];
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
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma tarefa encontrada. Adicione uma nova acima!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
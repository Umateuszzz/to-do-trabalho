import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleAddTodo = () => {
    console.log("Adicionar tarefa");
  };

  return (
    <div className="min-h-screen p-4">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meu To Do</h1>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 border rounded"
        >
          Sair
        </button>
      </nav>

      <div className="max-w-2xl mx-auto">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Tarefas</h2>

          <p>Seu To Do List aparecerá aqui.</p>

          <button
            onClick={handleAddTodo}
            className="mt-4 px-4 py-2 border rounded"
          >
            Adicionar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
}
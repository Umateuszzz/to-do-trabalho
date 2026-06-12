"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddTodo = () => {
    console.log("Adicionar tarefa");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-4">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meu To Do</h1>
        <div className="space-x-4">
          <Button onClick={handleSignOut} className="text-gray-500 hover:text-gray-700">
            Sair
          </Button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Tarefas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Sua lista de tarefas aparecerá aqui.</p>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={handleAddTodo}>
              Adicionar Tarefa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
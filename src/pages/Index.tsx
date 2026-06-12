"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

export default function Index() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <CheckSquare className="h-7 w-7 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Meu To Do</CardTitle>
          <CardDescription>
            Organize suas tarefas com segurança, autenticação e sincronização no Supabase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-700">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/register">Criar conta</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
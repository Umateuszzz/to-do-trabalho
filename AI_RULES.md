# Tech Stack

- You are building a React application.
- Use TypeScript.
- Use React Router. KEEP the routes in src/App.tsx
- Always put source code in the src folder.
- Put pages into src/pages/
- Put components into src/components/
- The main page (default page) is src/pages/Index.tsx
- UPDATE the main page to include the new components. OTHERWISE, the user can NOT see any components!
- ALWAYS try to use the shadcn/ui library.
- Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.

Available packages and libraries:

- The lucide-react package is installed for icons.
- You ALREADY have ALL the shadcn/ui components and their dependencies installed. So you don't need to install them again.
- You have ALL the necessary Radix UI components installed.
- Use prebuilt components from the shadcn/ui library after importing them. Note that these files shouldn't be edited, so make new components if you need to change them.
＜/dyad-write>

Now create src/pages/Index.tsx:

＜dyad-write path="src/pages/Index.tsx" description="Creating minimal Index page">
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold text-slate-800">Bem-vindo</h1>
        <p className="text-slate-600">Projeto web com React e shadcn/ui</p>
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">🚀 App Pronto</CardTitle>
            <CardDescription>
              Clique nos botões para explorar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Começar</Button>
            <Button variant="outline" className="w-full">Saiba Mais</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
＜/dyad-write>

Now create src/pages/About.tsx:

＜dyad-write path="src/pages/About.tsx" description="Creating About page">
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Sobre Nós</CardTitle>
          <CardDescription>
            Conheça mais sobre este projeto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Este é um projeto web moderno desenvolvido com as melhores práticas de desenvolvimento frontend, utilizando tecnologias de ponta para garantir performance e experiência do usuário excepcionais.
          </p>
          <p className="text-slate-600">
            Nossa stack inclui React, TypeScript, Tailwind CSS e shadcn/ui, proporcionando uma base sólida para construção de aplicações escaláveis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
＜/dyad-write>

Now create src/pages/Contact.tsx:

＜dyad-write path="src/pages/Contact.tsx" description="Creating Contact page">
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Contato</CardTitle>
          <CardDescription>
            Envie sua mensagem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" placeholder="Sua mensagem..." rows={5} />
            </div>
            <Button type="submit" className="w-full">Enviar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
＜/dyad-write>

Now update src/App.tsx:

＜dyad-write path="src/App.tsx" description="Updating App.tsx with routes for new pages">
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
＜/dyad-write>

Now we need to ensure we have a NotFound page; it's already present but we might need to ensure it's there. It exists in the context, but we can also create it if needed. But it's okay.

Now we need to rebuild the app so changes take effect. But the user didn't ask to rebuild now; they just want to create the project. However, after making changes, the app may need a rebuild. We can suggest to rebuild. But the user didn't ask for that. They just want to create the project. But we might need to ensure the app runs. Possibly we should add a <dyad-command type="rebuild">＜/dyad-command> at the end. But the user didn't ask for it. The previous instruction said after all code changes, provide a concise summary. So we can just provide the summary.

Thus we will output the ＜dyad-chat-summary> with a concise summary.

＜dyad-chat-summary>Projeto inicializado com páginas básicas＜/dyad-chat-summary>

Now ensure we close all tags properly.

We have used <dyad-write> for each file. Ensure we close each with ＜/dyad-write>. Actually the syntax is ＜dyad-write path="..." description="..."> ...content... ＜/dyad-write>. So we need to close with ＜/dyad-write>. In the examples, they used <dyad-write ...>content＜/dyad-write>. So we need to close.

Make sure we have proper closing tags.

Now produce final answer with all these tags in order, then the chat summary.

We must not include any markdown fences.

Let's produce the final answer.
</think><dyad-write path="AI_RULES.md" description="Replace AI_RULES.md with attached content">
# Tech Stack

- You are building a React application.
- Use TypeScript.
- Use React Router. KEEP the routes in src/App.tsx
- Always put source code in the src folder.
- Put pages into src/pages/
- Put components into src/components/
- The main page (default page) is src/pages/Index.tsx
- UPDATE the main page to include the new components. OTHERWISE, the user can NOT see any components!
- ALWAYS try to use the shadcn/ui library.
- Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.

Available packages and libraries:

- The lucide-react package is installed for icons.
- You ALREADY have ALL the shadcn/ui components and their dependencies installed. So you don't need to install them again.
- You have ALL the necessary Radix UI components installed.
- Use prebuilt components from the shadcn/ui library after importing them. Note that these files shouldn't be edited, so make new components if you need to change them.
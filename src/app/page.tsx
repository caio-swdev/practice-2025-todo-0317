import { Todo } from "@/components/Todo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24">
      <h1 className="text-3xl font-bold mb-8">Next.js Todo App</h1>
      <p className="text-center mb-8 text-muted-foreground max-w-md">
        This app demonstrates the integration of Next.js, Jest, shadcn/ui,
        Lucide icons, Storybook, and Cypress
      </p>
      <Todo
        initialTodos={[
          { id: "1", text: "Learn Next.js", completed: true },
          { id: "2", text: "Try shadcn/ui components", completed: false },
          { id: "3", text: "Write tests with Jest", completed: false },
          { id: "4", text: "Document with Storybook", completed: false },
          { id: "5", text: "Test with Cypress", completed: false },
        ]}
      />
    </main>
  );
}

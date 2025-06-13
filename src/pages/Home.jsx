import { Card, CardContent } from "@/components/ui/card";
import TodoList from "../components/TodoList";
import { useCreateTask } from "../hooks/useTodoList";
import { CreateTaskModal } from "../components/Modal";

const Home = () => {

  const {mutate: createTodo} = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const newTask = formData.get("name");
    const description = formData.get("description");

    createTodo({
      data: {
        name: newTask,
        description,
        status: "TODO"
      },
    });
    console.log("Data id", );
  };
  // ---TESTING ERROR BOUNDARY---
  // if () {
  //   throw new Error("Something went wrong in Home!");
  // }

  return (
    <main role="main" aria-labelledby="main-heading">
      <section className="min-h-screen flex items-center justify-center py-6">
        <Card className="w-full max-w-2xl font-inter bg-transparent">
          <CardContent className="flex flex-col justify-center gap-4 p-6  ">
            <h1
              id="main-heading"
              aria-label="Todo App Heading"
              className="text-3xl font-bold text-blue-primary border-b pb-4"
            >
              Todo App
            </h1>
            <CreateTaskModal onSubmit={handleSubmit} />
            <TodoList />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
export default Home;

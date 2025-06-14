import { useTaskById } from "../hooks/useTodoList";
import { useParams, useNavigate } from "react-router-dom";
import { SkeletonLoading } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Modal from "./Modal";
import { useUpdateTask } from "../hooks/useTodoList";

const TodoDetail = () => {
  const { mutate: updateTask } = useUpdateTask();

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useTaskById(id);

  if (isLoading) return <SkeletonLoading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleGoBack = () => navigate(-1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");

    // if (!numericId) {
    if (!data.id) {
      console.error("Todo ID is missing");
      return;
    }

    updateTask({
      id: data.id,
      data: {
        name,
        description,
        status,
      },
    });
    console.log("Data id", typeof data.id, data.id);
  };

  const statusColorMap = {
    IN_PROGRESS: "bg-chart-5/50",
    DONE: "bg-green-500/50",
    TODO: "bg-chart-1/50",
  };

  // ---TESTING ERROR BOUNDARY---

  // if (dis) {
  //   throw new Error("Something went wrong in Home!");
  // }

  return (
    <main role="main" aria-labelledby="todo-detail-heading">
      <section className="min-h-screen flex items-center justify-center py-6">
        <Card className="w-full max-w-2xl font-inter">
          <CardContent className="flex flex-col justify-center gap-4 p-6">
            <h1
              className="text-3xl font-bold text-blue-600 border-b pb-4"
              id="todo-detail-heading"
            >
              Todo Details
            </h1>
            {!data?.name && (
              <p className="italic text-xl text-center"> No task available</p>
            )}
            <h2 className="font-medium text-xl">Title: {data.name}</h2>
            <p className="text-gray-500 italic">
              {data.description || "No description available"}
            </p>
            {data.status === "DONE" ? (
              <p>
                Task completed at {new Date(data.createdAt).toLocaleString()}
              </p>
            ) : (
              <p>Task added on: {new Date(data.createdAt).toLocaleString()}</p>
            )}
            <p
              className={`${statusColorMap[data.status]} p-2 rounded-lg`}
              aria-live="polite"
            >
              {data.status.replace("_", " ").toUpperCase()}
            </p>

            <div className="flex justify-between gap-4 items-center">
              <Button
                onClick={handleGoBack}
                className="bg-blue-primary hover:bg-blue-secondary/90"
                aria-label="Go Back"
              >
                <ArrowLeft /> Go back
              </Button>
              <Modal task={data} onSubmit={handleSubmit} />
              {/* <Button className="bg-green-600" aria-label="Edit task">Edit Task</Button> */}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
export default TodoDetail;

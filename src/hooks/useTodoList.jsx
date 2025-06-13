import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTask,
  getTaskById,
  deleteTaskById,
  updateTask,
  createTask,
} from "../lib/todoApi";

export const useTaskList = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTask,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useTaskById = (id) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
};

export const useDeleteTaskById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskById,
    onMutate: async (id) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTodos = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(["tasks"], (old) =>
        old.filter((task) => task.id !== id)
      );

      return { previousTodos };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },

  });

  
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data}) => updateTask(id, data),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (old) =>
        old
          ? old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
          : []
      );
      queryClient.setQueryData(["task", String(updatedTask.id)], updatedTask);
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({data} ) => createTask(data),
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (old = []) => [newTask, ...old]);
      queryClient.invalidateQueries(['tasks']);
    },
  });
};


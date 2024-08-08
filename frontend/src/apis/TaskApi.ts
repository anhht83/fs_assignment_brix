import Api from "./Api";
import { useMutation } from "@tanstack/react-query";
import { TChangeStatusTasks, TDeleteTask, TFilterTasks, TStoreTask } from '@/types/task';

export const apiCreateTask = (options = {}) => {
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (formData: TStoreTask['request']): Promise<TStoreTask['response']> => {
      const response: any = await Api.fetchData({
          url: "/tasks",
          method: "post",
          data: formData,
        }
      )
      return response.data
    },
    ...options
  });
};

export const apiUpdateTask = (options = {}) => {
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async ({ id, task }: TStoreTask['request']): Promise<TStoreTask['response']> => {
      const response: any = await Api.fetchData({
          url: `/tasks/${id}`,
          method: "put",
          data: {
            task
          },
        }
      )
      return response.data
    },
    ...options
  });
};

export const apiDeleteTask = (options = {}) => {
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async ({ id }: TDeleteTask['request']): Promise<TDeleteTask['response']> => {
      const response: any = await Api.fetchData({
          url: `/tasks/${id}`,
          method: "delete",
        }
      )
      return response.data
    },
    ...options
  });
};

export const apiChangeStatusTasks = (options = {}) => {
  return useMutation({
    mutationKey: ["changStatusTasks"],
    mutationFn: async ({ ids, isCompleted }: TChangeStatusTasks['request']): Promise<TChangeStatusTasks['response']> => {
      const response: any = await Api.fetchData({
          url: `/tasks/change_status`,
          method: "post",
          data: {
            ids, isCompleted
          }
        }
      )
      return response.data
    },
    ...options
  });
};


export const apiClearCompletedTasks = (options = {}) => {
  return useMutation({
    mutationKey: ["clearCompletedTasks"],
    mutationFn: async (): Promise<any> => {
      const response: any = await Api.fetchData({
          url: `/tasks/clear_completed_items`,
          method: "post"
        }
      )
      return response.data
    },
    ...options
  });
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const apiFilterTasks =
  (options = {}) => useMutation({
    mutationKey: ["filterTasks"],
    mutationFn: async ({isCompleted}: TFilterTasks['request']): Promise<TFilterTasks['response']> => {
      const response: any = await Api.fetchData({
        url: `/tasks?isCompleted=${isCompleted}`
      });
      return response.data;
    },
    ...options
  });

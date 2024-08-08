import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

import H1 from "@/components/ui/h1";
import Card from "@/components/ui/card";
import Alert from "@/components/ui/alert";
import Spinner from '@/components/ui/spinner';
import {
  apiChangeStatusTasks,
  apiClearCompletedTasks,
  apiCreateTask,
  apiDeleteTask,
  apiFilterTasks,
  apiUpdateTask,
} from '@/apis/TaskApi';
import TaskForm from '@/pages/task/TaskForm';
import { TStoreTask } from '@/types/task';
import Button from '@/components/ui/button';

const TaskPage: NextPageWithLayout = () => {
  const [filterStatus, setFilterStatus] = useState<boolean | undefined>()
  const mutate = apiFilterTasks();

  const mutation = apiCreateTask();

  const mutationUpdate = apiUpdateTask();

  const mutationDelete = apiDeleteTask();

  const mutationChangeStatus = apiChangeStatusTasks();

  const mutationClearCompleted = apiClearCompletedTasks();

  const onRefesh = ()=> mutate.mutate({isCompleted: filterStatus})
  const onStoreTask = (values: TStoreTask['request']) => {
    if(values?.id){
      mutationUpdate.mutate({id: values.id, task: values.task},{
        onSuccess: onRefesh
      })
    }else {
      mutation.mutate(values, {
        onSuccess: onRefesh
      })
    }
  }

  const onDeleteTask = (id: number) => {
    mutationDelete.mutate({id},{
      onSuccess: onRefesh
    })
  }

  const toggleCompletedTask = (id: number, isCompleted: boolean) => {
    mutationChangeStatus.mutate({ids: [id], isCompleted},{
      onSuccess: onRefesh
    })
  }

  const toggleCompletedAllTasks = (isCompleted: boolean) => {
    mutationChangeStatus.mutate({ids: [0], isCompleted},{
      onSuccess: onRefesh
    })
  }

  const onFilter = (status?: boolean)=> {
    setFilterStatus(status)
  }

  const onClearCompleted = ()=> {
    mutationClearCompleted.mutate(undefined, {
      onSuccess: onRefesh
    })
  }

  useEffect(() => {
    mutate.mutate({isCompleted: filterStatus})
  }, [filterStatus]);

  return (
    <section className="py-6 text-sm">
      {mutate.error && <Alert>{mutate.error.response?.data?.message ?? mutate.error.message}</Alert>}
      <div className="flex flex-row justify-between items-center">
        <H1>Tasks</H1>
      </div>
      <Card>
        <TaskForm
          onStoreTask={onStoreTask}
          toggleCompletedAllTasks={toggleCompletedAllTasks}
        />
        {mutate.isPending ? <Spinner /> :  (
          (mutate.data?.records || []).map(task=> (
            <TaskForm
              key={task.id}
              task={task}
              onStoreTask={onStoreTask}
              onDeleteTask={onDeleteTask}
              toggleCompletedTask={toggleCompletedTask}
              toggleCompletedAllTasks={toggleCompletedAllTasks}
            />
          ))
        )}
        <div className="flex flex-row items-center justify-between gap-6 mt-4">
          <div>
            {`${mutate.data?.records.length || '-'} / ${mutate.data?.count || '-'} items`}
          </div>
          <div className='flex flex-row items-center gap-4'>
            <div
              className={`cursor-pointer underline ${filterStatus === undefined ? "font-bold" : ""}`}
              onClick={()=> onFilter()}
            >
              All
            </div>
            <div
              className={`cursor-pointer underline ${filterStatus === false ? "font-bold" : ""}`}
              onClick={()=> onFilter(false)}
            >
              InCompleted
            </div>
            <div
              className={`cursor-pointer underline ${filterStatus === true ? "font-bold" : ""}`}
              onClick={()=> onFilter(true)}
            >
              Completed
            </div>
            <Button size="sm" onClick={onClearCompleted}>Clear Completed Tasks</Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

TaskPage.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default TaskPage;

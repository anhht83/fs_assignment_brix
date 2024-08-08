import React from "react";
import { Formik } from "formik";

import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import * as Yup from "yup";
import Checkbox from '@/components/ui/checkbox';
import { TStoreTask, TTask } from '@/types/task';
import { FaChevronDown } from 'react-icons/fa6';

type TProp = {
  task?: TTask,
  onStoreTask: (values: TTask)=> void,
  onDeleteTask?: (id: number) => void,
  toggleCompletedTask?: (id: number, isCompleted: boolean) => void
  toggleCompletedAllTasks?: (isCompleted: boolean) => void
}
const TaskForm = ({task, onStoreTask, onDeleteTask, toggleCompletedTask, toggleCompletedAllTasks}: TProp) => {

  const onSubmit = (values: TStoreTask['request'], {resetForm}: any) => {
    onStoreTask({
      id: task?.id,
      ...values
    })
    resetForm()
  }

  const onDelete = (id: number) => {
    if(onDeleteTask) onDeleteTask(id)
  }


  const toggleCompleted = (id: number, isCompleted: boolean) => {
    if(toggleCompletedTask && id) toggleCompletedTask(id, isCompleted)
  }

  const toggleCompletedAll = (isCompleted: boolean) => {
    console.log(isCompleted)
    if(toggleCompletedAllTasks) toggleCompletedAllTasks(isCompleted)
  }

  const validationSchema = Yup.object().shape({
    task: Yup.string().required("Required"),
  });

  return (
    <div className="flex flex-row items-center justify-between gap-3 mb-3 border-b pb-3">
      <div className="flex flex-1 flex-row gap-3 items-center">
        {task?.id ? (
          <Checkbox checked={task.isCompleted} onChange={(checked: boolean) => {
            if(task?.id) toggleCompleted(task.id, checked)
          }} />
        ): (
          <FaChevronDown onClick={() => toggleCompletedAll(true)}/>
        )}
        <Formik
          onSubmit={onSubmit}
          enableReinitialize
          initialValues={{
            task: task?.task || '',
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, setFieldValue }) => (
            <form onSubmit={e => e.preventDefault()} className='w-full'>
              <Input
                readOnly={!!task?.id}
                name='task'
                onKeyPress={(event)=>{
                  if(event.key.toLowerCase() === 'enter') {
                    handleSubmit();
                  }
                }}
                className={task?.isCompleted ? 'line-through' : ''}
              />
            </form>
          )}
        </Formik>
      </div>
      {task?.id && (
        <Button onClick={()=> {
          if(task?.id) onDelete(task?.id)
        }}>X</Button>
      )}
    </div>
  );
};

export default TaskForm;

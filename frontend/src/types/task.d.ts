export type TTask =  {
  id?: number,
  task: string,
  isCompleted?: boolean,
  createdAt?: string,
  updatedAt?: string,
}
export type TStoreTask = {
  request: {
    id?: number,
    task: string,
  },
  response: TTask
}

export type TFilterTasks = {
  request: {
    isCompleted?: boolean
  },
  response: {
    records: TTask[],
    count: number
  }
}


export type TDeleteTask = {
  request: {
    id: number
  },
  response: any
}

export type TChangeStatusTasks = {
  request: {
    ids: number[],
    isCompleted: boolean
  },
  response: any
}

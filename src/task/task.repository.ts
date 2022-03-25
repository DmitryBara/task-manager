import { Injectable } from '@nestjs/common'
import { Status, TaskEntity } from './dto/task.entity'
import { memoryDB } from 'src/db'


interface CreateTaskData {
  title: string,
  phaseId: number,
  previousTaskId: number | null,
}


interface UpdateTaskData {
  status?: Status,
  nextTaskId?: number,
}


@Injectable()
export class TaskRepository {

  async createTask(createTaskData: CreateTaskData): Promise<TaskEntity> {
    const id = memoryDB.lastTaskId + 1

    let task: TaskEntity = {
      id,
      title: createTaskData.title,
      phaseId: createTaskData.phaseId,
      status: Status.AWAITING,
      previousTaskId: createTaskData.previousTaskId,
      nextTaskId: null,
    }

    memoryDB.tasks.push(task)
    memoryDB.lastTaskId = id

    return task
  }

  async updateTask(id: number, updateTaskData: UpdateTaskData): Promise<TaskEntity> {
    const taskIndex = memoryDB.tasks.findIndex((oneTask) => { return oneTask.id === id })

    if (taskIndex === -1) {
      throw Error('Task not found.')
    }

    let task = memoryDB.tasks[taskIndex]

    updateTaskData.status ? task.status = updateTaskData.status : undefined
    updateTaskData.nextTaskId ? task.nextTaskId = updateTaskData.nextTaskId : undefined

    return task
  }

  async getTasks(): Promise<TaskEntity[]> {
    return memoryDB.tasks
  }

  async getTask(taskId: number): Promise<TaskEntity> {
    const task = memoryDB.tasks.find((oneTask) => {
      return oneTask.id === taskId
    })

    if (task === undefined) {
      throw Error('Task not found.')
    }

    return task
  }
}

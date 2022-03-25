import { Injectable } from '@nestjs/common'
import { TaskRepository } from './task.repository'
import { TaskChangeStatusInput, TaskCreateInput } from './dto/task.input'
import { Status, TaskEntity } from './dto/task.entity'
import { TaskOutput } from './dto/task.output'
import { PhaseRepository } from 'src/phase/phase.repository'


@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly phaseRepository: PhaseRepository
  ) { }

  async createTask(
    taskCreateInput: TaskCreateInput,
  ): Promise<TaskEntity> {

    const allTasks = await this.taskRepository.getTasks()

    const lastTaskInCurrentPhase = allTasks.find((oneTask) => {
      return ((oneTask.phaseId === taskCreateInput.phaseId) && (oneTask.nextTaskId === null))
    })

    const currentPhase = await this.phaseRepository.getPhase(taskCreateInput.phaseId)
    const firstTaskInNextPhase = allTasks.find((oneTask) => {
      return ((oneTask.phaseId === currentPhase.nextPhaseId) && (oneTask.previousTaskId === null))
    })

    if (firstTaskInNextPhase && firstTaskInNextPhase.status == Status.FINISHED) {
      throw Error('You could not add new task in this phase because first task in next phase already finished.')
    }

    /* 
    1. create new Task
    2. update field 'nextTaskId' on last Task within current Phase
    TODO: make it in one transaction
    */

    const task = await this.taskRepository.createTask({
      title: taskCreateInput.title,
      phaseId: taskCreateInput.phaseId,
      previousTaskId: lastTaskInCurrentPhase ? lastTaskInCurrentPhase.id : null,
    })

    if (lastTaskInCurrentPhase) {
      await this.taskRepository.updateTask(
        lastTaskInCurrentPhase.id,
        {
          nextTaskId: task.id
        }
      )
      return task
    } else {
      return task
    }
  }


  async changeStatusOfTask(
    taskChangeStatusInput: TaskChangeStatusInput,
  ): Promise<TaskEntity> {

    const taskId = taskChangeStatusInput.id

    const task = await this.taskRepository.getTask(taskId)
    const taskStatusOld = task.status
    const taskStatusNew = (taskStatusOld === Status.AWAITING) ? Status.FINISHED : Status.AWAITING

    const previousTask = task.previousTaskId ? await this.taskRepository.getTask(task.previousTaskId) : null
    const nextTask = task.nextTaskId ? await this.taskRepository.getTask(task.nextTaskId) : null

    if (taskStatusNew == Status.AWAITING && nextTask && nextTask.status === Status.FINISHED) {
      throw Error('New status of task conflict with status of next task.')
    } else if (taskStatusNew == Status.FINISHED && previousTask && previousTask.status === Status.AWAITING) {
      throw Error('New status of task conflict with status of previous task.')
    }

    return await this.taskRepository.updateTask(
      taskId,
      {
        status: taskStatusNew
      },
    )
  }

  async getTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks()
  }

  /* Transform data for client. 
  Instead of phaseId client should receive full information about Phase */
  async transformTaskEntityToTaskOutput(task: TaskEntity): Promise<TaskOutput> {
    const phase = await this.phaseRepository.getPhase(task.phaseId)
    return {
      ...task,
      phase,
    }
  }
}


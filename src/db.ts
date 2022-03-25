import { PhaseEntity } from './phase/dto/phase.entity'
import { TaskEntity } from './task/dto/task.entity'


/* TODO: 
1. Separate this singleton by modules (phase and tasks) if we continue use memory
2. move from memory to database, then
   - import { Task } from '@prisma/client'
   - import { Phase } from '@prisma/client'
*/



class MemoryDB {

  public tasks: TaskEntity[]
  public phases: PhaseEntity[]

  /* instead of autocincrement on db level 
  we need realize our own autoincrement */
  public lastTaskId: number
  public lastPhaseId: number

  constructor() {
    this.tasks = []
    this.phases = []
    this.lastTaskId = -1
    this.lastPhaseId = -1
  }
}

export const memoryDB = new MemoryDB()

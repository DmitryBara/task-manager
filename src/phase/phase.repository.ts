import { Injectable } from '@nestjs/common'
import { PhaseEntity } from './dto/phase.entity'
import { memoryDB } from 'src/db'


interface CreatePhaseData {
  name: string,
  previousPhaseId: number | null,
}

interface UpdatePhaseData {
  nextPhaseId?: number,
}


@Injectable()
export class PhaseRepository {

  async createPhase(createPhaseData: CreatePhaseData): Promise<PhaseEntity> {

    const id = memoryDB.lastPhaseId + 1

    const phase: PhaseEntity = {
      id,
      name: createPhaseData.name,
      previousPhaseId: createPhaseData.previousPhaseId,
      nextPhaseId: null,
    }

    memoryDB.phases.push(phase)
    memoryDB.lastPhaseId = id

    return phase
  }

  async updatePhase(id: number, updatePhaseData: UpdatePhaseData): Promise<PhaseEntity> {
    const phaseIndex = memoryDB.phases.findIndex((onePhase) => { return onePhase.id === id })

    if (phaseIndex === -1) {
      throw Error('Phase not found.')
    }

    let phase = memoryDB.phases[phaseIndex]

    updatePhaseData.nextPhaseId ? phase.nextPhaseId = updatePhaseData.nextPhaseId : undefined

    return phase
  }

  async getPhase(phaseId: number): Promise<PhaseEntity> {
    const phase = memoryDB.phases.find((onePhase) => { return onePhase.id === phaseId })

    if (phase === undefined) {
      throw Error('Phase not found.')
    }

    return phase
  }

  async getAllPhases(): Promise<PhaseEntity[]> {
    return memoryDB.phases
  }
}

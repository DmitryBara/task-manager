import { Injectable } from '@nestjs/common'
import { PhaseCreateInput } from './dto/phase.input'
import { PhaseRepository } from './phase.repository'
import { PhaseEntity } from './dto/phase.entity'



@Injectable()
export class PhaseService {
  constructor(private readonly phaseRepository: PhaseRepository) { }

  async createPhase(
    phaseCreateInput: PhaseCreateInput,
  ): Promise<PhaseEntity> {

    const allPhases = await this.phaseRepository.getAllPhases()
    const lastPhase = allPhases.find((onePhase) => {
      return (onePhase.nextPhaseId === null)
    })

    /* 
    1. create new Phase
    2. update field 'nextPhaseId' on last Phase
    TODO: make it in one transaction
    */

    const phase = await this.phaseRepository.createPhase({
      name: phaseCreateInput.name,
      previousPhaseId: lastPhase ? lastPhase.id : null,
    })

    if (lastPhase) {
      await this.phaseRepository.updatePhase(
        lastPhase.id,
        {
          nextPhaseId: phase.id
        }
      )
      return phase
    } else {
      return phase
    }
  }
}

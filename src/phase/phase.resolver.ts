import { Args, Resolver, Mutation } from '@nestjs/graphql'
import { PhaseCreateInput } from './dto/phase.input'
import { PhaseService } from './phase.service'
import { PhaseOutput } from './dto/phase.output'


@Resolver(() => PhaseOutput)
export class PhaseResolver {

  constructor(private readonly phaseService: PhaseService) { }

  @Mutation(() => PhaseOutput)
  async phaseCreate(
    @Args('input') phaseCreateInput: PhaseCreateInput,
  ): Promise<PhaseOutput> {

    return await this.phaseService.createPhase(
      phaseCreateInput
    )
  }
}
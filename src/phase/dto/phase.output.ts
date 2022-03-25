import { ObjectType } from '@nestjs/graphql'
import { PhaseEntity } from './phase.entity'


@ObjectType()
export class PhaseOutput extends PhaseEntity { }

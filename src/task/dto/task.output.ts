import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PhaseOutput } from '../../phase/dto/phase.output'

export enum Status {
	AWAITING,
	FINISHED,
}


@ObjectType()
export class TaskOutput {
	@Field(() => Int)
	id!: number

	@Field(() => PhaseOutput)
	phase!: PhaseOutput

	@Field()
	status!: Status

	@Field()
	title!: string

	@Field(() => Int, { nullable: true })
	previousTaskId!: number | null

	@Field(() => Int, { nullable: true })
	nextTaskId!: number | null
}
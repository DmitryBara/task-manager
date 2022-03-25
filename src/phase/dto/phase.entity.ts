import { Field, Int, ObjectType } from '@nestjs/graphql'


@ObjectType()
export class PhaseEntity {
	@Field(() => Int)
	id!: number

	@Field()
	name!: string

	/* 
	a) store id of previous Phase 
	b) store null if current Phase is first 
	*/
	@Field(() => Int, { nullable: true })
	previousPhaseId!: number | null

	/* 
	a) store id of next Phase 
	b) store null if current Phase is last 
	*/
	@Field(() => Int, { nullable: true })
	nextPhaseId!: number | null
}

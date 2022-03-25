import { Field, Int, ObjectType } from '@nestjs/graphql'


/* TODO: import { Status} from '@prisma/client' */
export enum Status {
	AWAITING,
	FINISHED,
}


@ObjectType()
export class TaskEntity {
	@Field(() => Int)
	id!: number

	@Field(() => Int)
	phaseId!: number

	@Field(() => Status)
	status!: Status

	@Field()
	title!: string

	/* 
	a) store id of previous Task within the current Phase; 
	b) store null if current Task is first in Phase 
	*/
	@Field(() => Int, { nullable: true })
	previousTaskId!: number | null

	/*
	a) store id of next Task within the current Phase; 
	b) store null if current Task is last in Phase 
	*/
	@Field(() => Int, { nullable: true })
	nextTaskId!: number | null
}

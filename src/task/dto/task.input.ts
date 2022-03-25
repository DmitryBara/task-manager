import { Field, Int, InputType } from '@nestjs/graphql'


@InputType()
export class TaskCreateInput {
	@Field(() => Int)
	phaseId!: number

	@Field(() => String)
	title!: string
}


@InputType()
export class TaskChangeStatusInput {
	@Field(() => Int)
	id!: number
}

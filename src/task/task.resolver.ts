import { Args, Resolver, Mutation, Query } from '@nestjs/graphql'
import { TaskService } from './task.service'
import { TaskChangeStatusInput, TaskCreateInput } from './dto/task.input'
import { TaskOutput } from './dto/task.output'


@Resolver(() => TaskOutput)
export class TaskResolver {

	constructor(private readonly taskService: TaskService) { }

	@Mutation(() => TaskOutput)
	async taskCreate(
		@Args('input') taskCreateInput: TaskCreateInput,
	): Promise<TaskOutput> {

		const task = await this.taskService.createTask(
			taskCreateInput
		)

		return await this.taskService.transformTaskEntityToTaskOutput(task)
	}

	@Mutation(() => TaskOutput)
	async taskChangeStatus(
		@Args('input') taskChangeStatusInput: TaskChangeStatusInput,
	): Promise<TaskOutput> {

		const task = await this.taskService.changeStatusOfTask(
			taskChangeStatusInput
		)

		return await this.taskService.transformTaskEntityToTaskOutput(task)
	}

	@Query(() => [TaskOutput])
	async tasks(): Promise<TaskOutput[]> {
		const tasks = await this.taskService.getTasks()

		return await Promise.all(tasks.map((task) => {
			return this.taskService.transformTaskEntityToTaskOutput(task)
		}));
	}
}




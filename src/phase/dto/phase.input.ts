import { Field, InputType } from '@nestjs/graphql'


@InputType()
export class PhaseCreateInput {
  @Field()
  name!: string
}


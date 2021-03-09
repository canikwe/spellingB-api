import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

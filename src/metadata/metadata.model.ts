import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Metadata {
  @Field()
  title: string;

  @Field()
  description?: string;

  @Field()
  largestImage?: string;
}

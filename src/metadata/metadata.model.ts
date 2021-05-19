import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Metadata {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  largestImage?: string;
}

export type Image = {
  url: string;
  width: number;
  height: number;
};

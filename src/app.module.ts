import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [
    MetadataModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}

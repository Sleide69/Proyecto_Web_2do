import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { JsonPersistenceService } from './persistence/json-persistence.service';
import { RaceService, CompetitorService, RegistrationService } from './services';
import { RaceResolver, CompetitorResolver, RegistrationResolver } from './resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
    }),
  ],
  providers: [
    JsonPersistenceService,
    RaceService,
    CompetitorService,
    RegistrationService,
    RaceResolver,
    CompetitorResolver,
    RegistrationResolver,
  ],
})
export class AppModule {}

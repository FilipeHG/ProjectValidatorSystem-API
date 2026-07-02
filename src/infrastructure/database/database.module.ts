import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DatabaseConnectionException } from '../exceptions/infrastructure.exception';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const connectionString = configService.get<string>('DATABASE_URL');
          if (!connectionString) {
            throw new Error('DATABASE_URL is not defined');
          }
          
          const client = postgres(connectionString, { prepare: false });
          return drizzle(client, { schema });
        } catch (error) {
          throw new DatabaseConnectionException(
            error instanceof Error ? error.message : 'Unknown database connection error',
          );
        }
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

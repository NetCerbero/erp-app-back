import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/core/config/config.keys';
import { ConnectionOptions } from 'tls';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres',
        host: config.get(Configuration.DATABASE_HOST),
        port: parseInt(config.get(Configuration.DATABASE_PORT) ?? ''),
        database: config.get(Configuration.DATABASE_NAME),
        username: config.get(Configuration.DATABASE_USER),
        password: config.get(Configuration.DATABASE_PASSWORD),
        entities: [__dirname + '/../*/*/*/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        schema: config.get(Configuration.ENV),
        //logging: true,
      } as ConnectionOptions;
    },
  }),
];

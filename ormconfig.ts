import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  //schema: process.env.ENV,
  synchronize: false,
  entities: ['src/modules/*/*/*.entity{.ts,.js}'], //[__dirname + '\\entities\\**\\*{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
} as DataSourceOptions;

export const dataSource = new DataSource(config);

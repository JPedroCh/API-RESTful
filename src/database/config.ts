import { DataSource } from 'typeorm'
import dotenv from 'dotenv';

dotenv.config()

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  port: Number(process.env.DB_PORT) || 5432,
  entities: [`${__dirname}/entities/*{.ts, .js}`],
  synchronize: true
})
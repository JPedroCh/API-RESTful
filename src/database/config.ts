import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://dbnews_user:Y35KfBseQGwL5pb1pL2dgfAxP3TfhXcW@dpg-cpadq7v109ks73an5i8g-a.oregon-postgres.render.com/dbnews?ssl=true',
  port: 5432,
  entities: [`${__dirname}/entities/*{.ts, .js}`],
  synchronize: true
})
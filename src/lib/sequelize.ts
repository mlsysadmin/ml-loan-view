// lib/sequelize.ts
import { Sequelize } from 'sequelize';
console.log('========', process.env)
export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql'
  }
);

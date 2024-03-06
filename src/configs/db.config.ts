import { Sequelize } from "sequelize-typescript";
const DB_URL: any = process.env.DB_URL;

export const sequelize = new Sequelize(DB_URL, {
  define: {
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "updated_date",
    deletedAt: "deleted_date",
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 20000,
    idle: 5000,
  },
  dialectOptions: {
    ssl: false,
    native: true,
    useUTC: false,
  },
  timezone: "+07:00",
});

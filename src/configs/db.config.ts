import { Sequelize } from "sequelize-typescript";
const DB_URL: any = process.env.DB_URL;

export const sequelize = new Sequelize(DB_URL, {
  define: {
    timestamps: true,
    createdAt: "create_date",
    updatedAt: "update_date",
    deletedAt: "delete_date",
  },
  pool: {
    max: 10,
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

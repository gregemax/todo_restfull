import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { todo } from "./entity/todo";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.db_username || "postgres",
  password: process.env.db_password || "root",
  database: process.env.db_database || "todo",
  synchronize: true,
  logging: false,
  entities: [User, todo],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    "connected";
  })
  .catch((error: any) => console.log(error));

export default AppDataSource;

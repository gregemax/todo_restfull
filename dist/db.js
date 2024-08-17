"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const todo_1 = require("./entity/todo");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.db_username || "postgres",
    password: process.env.db_password || "root",
    database: process.env.db_database || "todo",
    synchronize: true,
    logging: false,
    entities: [user_1.User, todo_1.todo],
    migrations: [],
    subscribers: [],
});
AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    "connected";
}))
    .catch((error) => console.log(error));
exports.default = AppDataSource;

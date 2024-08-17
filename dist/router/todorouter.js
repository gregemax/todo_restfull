"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todocontroller_1 = require("../controller/todocontroller");
const auturization_1 = require("../auth/auturization");
const Todo = express_1.default.Router();
Todo.post("/createtodo", auturization_1.auth, todocontroller_1.createtodo);
Todo.get("/getalltodo", auturization_1.auth, todocontroller_1.getalltodo);
Todo.get("/getuser/:id", auturization_1.auth, todocontroller_1.getonetodo);
Todo.delete("/deleteuser/:id", todocontroller_1.deletetodo);
Todo.patch("/updatetodo/:id", todocontroller_1.updatetodo);
exports.default = Todo;

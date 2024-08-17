import express from "express";
import { login, save } from "../controller/usercontroller";
import { createtodo ,getalltodo,getonetodo,deletetodo,updatetodo} from "../controller/todocontroller";
import { auth } from "../auth/auturization";

const Todo = express.Router();
Todo.post("/createtodo",auth, createtodo);
Todo.get("/getalltodo",auth, getalltodo);
Todo.get("/getuser/:id",auth, getonetodo);
Todo.delete("/deleteuser/:id", deletetodo);
Todo.patch("/updatetodo/:id", updatetodo);


export default Todo;

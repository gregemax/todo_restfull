import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import AppDataSource from "./db";
import { handle } from "./errors/error.midd";
import * as dotenv from "dotenv";
import router from "./router/userrouter";
import { login } from "./controller/usercontroller";
import Todo from "./router/todorouter";

dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log(err["message"]||err);

  process.exit(1);
});


AppDataSource
const app = express();

app.use(express.json());

app.use("/users", router);
app.use("/todos", Todo);

app.post("user/login", login)
app.get("/users", async (req: Request, res: Response) => { })




app.use("*", handle);
app.listen(4000, () => {
    
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
});



process.on("unhandledRejection", (err) => { 
    console.log(err["message"]||err);
    
    process.exit(1);
})
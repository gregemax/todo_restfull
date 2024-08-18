import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import AppDataSource from "./db";
import { handle } from "./errors/error.midd";
import * as dotenv from "dotenv";
import router from "./router/userrouter";
import { login } from "./controller/usercontroller";
import Todo from "./router/todorouter";
 import cors from "cors";
dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log(err["message"]||err);
 
  process.exit(1);
});


AppDataSource
const app = express();
app.use(cors());
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);
app.use(express.json());

app.use("/users", router);
app.use("/todos", Todo);

app.post("user/login", login)
app.get("/users", async (req: Request, res: Response) => { })




app.use("*", handle);
app.listen(4000, () => {
    
    console.log(
      "Express server has started on port 4000"
    );
});



process.on("unhandledRejection", (err) => { 
    console.log(err["message"]||err);
    
    process.exit(1);
})

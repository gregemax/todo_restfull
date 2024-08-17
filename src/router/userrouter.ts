import express from "express";
import { all, del, login, one, save } from "../controller/usercontroller";


const router = express.Router()
router.post("/login", login)
router.post("/signup", save)
router.get("/getallusers", all)
router.get("/getuser/:id", one)
router.delete("/deleteuser/:id", del)




export default router
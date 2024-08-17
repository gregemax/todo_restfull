"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controller/usercontroller");
const router = express_1.default.Router();
router.post("/login", usercontroller_1.login);
router.post("/signup", usercontroller_1.save);
router.get("/getallusers", usercontroller_1.all);
router.get("/getuser/:id", usercontroller_1.one);
router.delete("/deleteuser/:id", usercontroller_1.del);
exports.default = router;

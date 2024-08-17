"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.del = exports.save = exports.one = exports.all = void 0;
const user_1 = require("../entity/user");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const userRepository = db_1.default.getRepository(user_1.User);
const all = (request, response, next) => {
    return userRepository.find();
};
exports.all = all;
const one = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const user = yield userRepository.findOne({
        where: { id },
    });
    if (!user) {
        return "unregistered user";
    }
    return user;
});
exports.one = one;
const save = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, password, confirmpassword, email } = request.body;
        if (password != confirmpassword) {
            response.json({
                message: `  password must match confirm password`,
            });
        }
        if (!name && !password && !email) {
            response.json({
                message: `please provide name, password, email`,
            });
        }
        password = yield bcrypt.hash(password, 12);
        const user = yield userRepository.create({ email, name, password });
        const saveduser = yield userRepository.save(user);
        const token = yield jwt.sign({
            userId: user.id,
            userEmail: user.email,
        }, process.env.jwtsecret || "secret", { expiresIn: "1h" });
        return response.json({
            token,
            saveduser,
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});
exports.save = save;
const del = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    let userToRemove = yield userRepository.findOneBy({ id });
    if (!userToRemove) {
        return "this user not exist";
    }
    yield userRepository.remove(userToRemove);
    return "user has been removed";
});
exports.del = del;
const login = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!email && !password) {
            response.json({
                message: ` enter email or password`,
            });
        }
        const user = yield userRepository.findOne({
            where: { email },
        });
        if (!user) {
            response.json({
                message: "no user found with this email ",
            });
        }
        const veifypassword = bcrypt.compare(password, user.password);
        if (!veifypassword) {
            response.json({
                message: "please enter a correct password ",
            });
        }
        const token = jwt.sign({
            userId: user.id,
            userEmail: user.email,
        }, process.env.jwtsecret || "secret", { expiresIn: "3d" });
        response.json({
            token,
            user,
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});
exports.login = login;

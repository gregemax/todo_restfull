import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import AppDataSource from "../db";
const userRepository = AppDataSource.getRepository(User);
export const all = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return userRepository.find();
};

export const one = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  const user = await userRepository.findOne({
    where: { id },
  });

  if (!user) {
    return "unregistered user";
  }
  return user;
};

export const save = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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
    password = await bcrypt.hash(password, 12);
    const user = await userRepository.create({ email, name, password });
    const saveduser = await userRepository.save(user);
    const token = await jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
      },
      process.env.jwtsecret || "secret",
      { expiresIn: "1h" }
    );

    return response.json({
      token,
      saveduser,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const del = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userToRemove = await userRepository.findOneBy({ id });

  if (!userToRemove) {
    return "this user not exist";
  }

  await userRepository.remove(userToRemove);

  return "user has been removed";
};

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;
    if (!email && !password) {
      response.json({
        message: ` enter email or password`,
      });
    }

    const user = await userRepository.findOne({
      where: { email },
     
    } as any);
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

    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
      },
      process.env.jwtsecret || "secret",
      { expiresIn: "3d" }
    );

    response.json({
      token,
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import AppDataSource from "../db";
import { todo } from "../entity/todo";
const todoRepository = AppDataSource.getRepository(todo);
export const getalltodo = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return response.json({todos:todoRepository.find({where: { User: request['user'].id } })});
};

export const getonetodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  const user = await todoRepository.findOne({
    where: { id },
  });

  if (!user) {
    return response.json( "not found todo");
  }
  return response.json( {user});
};

export const createtodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let {
    title,
    description,
    status,
    priority,
    dueDate,

  } = request.body;

    const user = await todoRepository.create({
      title,
      description,
      status,
      priority,
      dueDate,
 
     
    });
    user.createdAt = new Date(Date.now());
    console.log(request["user"].id);
    
user.User = request["user"].id;
  const todo = await todoRepository.save(user);

  return response.json({
    todo:todo,
  });
};

export const deletetodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userToRemove = await todoRepository.findOneBy({ id });

  if (!userToRemove) {
    response.send("this user not exist");
  }

  await todoRepository.delete({ id: userToRemove.id });

  return response.send( "user has been removed");
};


export const updatetodo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const object = Object.assign({ updatedAt: new Date(Date.now()) }, request.body);
  const updatetod = await todoRepository.update(
    parseInt(request.params.id),
    object
  );
  return response.send("updated successfull")
};

import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { todo } from "./todo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;
    
    @OneToMany(() => todo, (Todo) => todo.User)
    todos: todo[];
}

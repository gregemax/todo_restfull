import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type:"enum", enum: ["open", "closed" ,"in progress" , "done"], default: "open"  })
  status: string;

  @Column({ type:"enum", enum: ["low", "medium", "high"], default: "low"  })
  priority: string;

  @Column({  type:"date" ,nullable: true })
  dueDate: Date;

  @Column({ type:"date",nullable: true })
  createdAt: Date;
  @Column({ type:"date", nullable: true })
  updatedAt: Date;
    
    @ManyToOne(() => User, (user) => user.todos, { eager: true })
    User: User;
    static User: any;
}

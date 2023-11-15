import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne, JoinColumn } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    amount: number

    @Column({nullable: true, type: "float", scale: 2})
    percent: number


    @ManyToOne(() => Todo, todo => todo.id, {nullable: false, onDelete: "SET NULL"})
    @JoinColumn()
    todo: Todo

    @Column()
    todoId: number
        
}
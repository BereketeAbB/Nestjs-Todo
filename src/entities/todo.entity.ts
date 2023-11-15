import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    value: number

    @OneToMany(() => Task, task => task.todo, {eager: true})
    task: Task[]

    constructor(title:string, value:number){
        this.title = title
        this.value = value

    }
}
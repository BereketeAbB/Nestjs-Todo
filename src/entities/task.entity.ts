import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable, AfterLoad, EventSubscriber, JoinColumn, BeforeInsert, Repository, getRepository } from "typeorm";
import { Todo } from "./todo.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Entity()
@EventSubscriber()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    amount: number

    @Column({nullable: true, type: "float", scale: 2})
    percent: number

    @ManyToOne(() => Todo, todo => todo.id, {nullable: false, onDelete: "SET NULL", eager:true})
    @JoinColumn()
    todo: Todo

    @Column()
    todoId: number
    
    @BeforeInsert()
    async checkSumAndsetPercent(){
        
        
        if(this.todo && this.todo.value != 0)
            this.percent = this.amount / this.todo.value * 100
        else {
            this.percent = 0
            console.log(this.todo);
            
        }
    }
    constructor(title:string, amount:number, todo:Todo){
        this.title = title
        this.amount = amount
        this.todo = todo

       // this.setPercent()
    }
}
import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne, EventSubscriber, JoinColumn, BeforeInsert, Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ForbiddenException, forwardRef, Inject } from "@nestjs/common";


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


    @ManyToOne(() => Todo, todo => todo.id, {nullable: false, onDelete: "SET NULL", eager:true})
    @JoinColumn()
    todo: Todo

    @Column()
    todoId: number
    
    constructor(
        // @InjectRepository(Todo) private todoRepository: Repository<Todo>,
        @Inject(forwardRef(() => Todo)) private todoRepository: Repository<Todo>,
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
        ){}
        // title:string, amount:number, todo:Todo, todoId:number){

    @BeforeInsert()
    async checkSumAndsetPercent(){
        const tasks = await this.taskRepository.find({where: {todoId: this.todoId}, select: ['amount']})
        
        const todo = await this.todoRepository.findOne({where: {id: this.todoId}})
    
        const sum:number = tasks.reduce((result, task) => result + task.amount, 0)
        if(sum + this.amount >= todo.value)
            throw new ForbiddenException()
        
        if(todo && todo.value != 0)
            this.percent = this.amount / this.todo.value * 100
        else {
            this.percent = 0
            console.log(todo);
        }
    }
        

        // this.title = title
        // this.amount = amount
        // this.todo = todo
        // this.todoId = todoId

       // this.setPercent()
    //}
}
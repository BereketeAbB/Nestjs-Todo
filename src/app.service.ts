import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(Task) private taskRepository: Repository<Task>
    ){}

  async createTodo(title:string, value:number): Promise<Todo | null>{
    const newTodo = new Todo(title, value)
    return await this.todoRepository.save(newTodo)

  }

  async addTask(title:string, amount:number, todoId:number){
    const todo = await this.todoRepository.findOneBy({id: todoId})
    
    if(!todo)
      throw new NotFoundException()

    const totalSum:number = todo.task.reduce((sum, task) => sum + task.amount, 0)

    if(totalSum + amount > todo.value)
        throw new ForbiddenException()
    
    const percent = amount / todo.value * 100
    const newTask = this.taskRepository.create({title, amount, percent, todoId})
    return await this.taskRepository.save(newTask)
  }

  async getTodo(title:string)  {
    const todo = await this.todoRepository.findOne({where: {title}, relations:['task']}) 

    if(!todo)
      throw new NotFoundException()

    return todo
  }

  async getAllTodo(){
    return this.todoRepository.find()
  }

}

import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
    // const tasks = await this.taskRepository.find({where: {todoId}, select: ['amount']})
    
    // const sum:number = tasks.reduce((result, task) => result + task.amount, 0)
    

    const { sum } = await this.taskRepository
                        .createQueryBuilder('task')
                        .select("SUM(task.amount)", "sum")
                        .getRawOne()
    
    if(sum + amount >= todo.value)
       throw new ForbiddenException()
              console.log({sum});
    
    const newTask = new Task(title, amount, todo)
    return await this.taskRepository.save(newTask)
  }

  async getTodo(title:string)  {
    const todo = await this.todoRepository.findOne({where: {title}, relations:['task']}) 

    if(!todo)
      throw new NotFoundException()

    return todo
  }

  async getTodos(title:string) {
    
  }
}

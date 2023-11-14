import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('todo')
  createTodo(@Body() body:any){
    const {title, value} = body 
    return this.appService.createTodo(title, value)
  }

  @Post('task')
  addTask(@Body() body:any){
    const {title, amount, todoId} = body
    return this.appService.addTask(title, amount, todoId)
  }

  @Get('todo/:todoTitle')
  getTodo(@Param('todoTitle') todoTitle:string) { 
    return this.appService.getTodo(todoTitle)
  }

  // @Get('tasks/:todoTitle')
  // getTasks(@Param('todoTitle') todoTitle:string) { 
  //   return this.appService.getTasks(todoTitle)
  // }
}

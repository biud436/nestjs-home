import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { 
      message1: "테스트 메시지 1",
      message2: "테스트 메시지 2",
      message3: "테스트 메시지 3",
      buttonText1: "버튼1"
    };
  }
}

import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import * as fs from "fs";
import * as path from "path";
import {promisify} from "util";
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async root() {

    return { 
      "message1": "테스트 메시지 1",
      "message2": "테스트 메시지 2",
      "message3": "테스트 메시지 3",
      "buttonText1": "버튼1",
      "left": "왼쪽",
      "center": "중앙",
      "right": "오른쪽",
      "header": {
        "logo": "https://dummyimage.com/64x64/000/fff",
        "menu1": "메뉴1",
        "menu2": "메뉴2",
      },
      "content": "내용",
      "title": "회원 가입 페이지"
    };

  }

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req) {
    return req.user;
  }

}

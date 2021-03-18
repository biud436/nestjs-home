import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, text, Response } from 'express';

@Controller('captcha')
export class CaptchaController {

    @Get()
    index(@Req() request: Request, @Res() response: Response): string {

        const startCharCode = 44032;
        const maxCharCode = 19 * 28 * 21;

        // 램덤한 글자를 획득한다.
        let texts = [];

        for(let i = 1; i <= 21; i++) {
            const j = (Math.random() * 28) >> 0;
            const charCode = 19 * i * j;
            const c = String.fromCharCode(charCode);

            texts.push(c);
        }

        return JSON.stringify({
            text: texts.join("")
        });

    }
}
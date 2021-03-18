import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('captcha')
export class CaptchaController {

    @Get()
    index(): object {

        const startCharCode = 44032;
        const maxCharCode = 19 * 28 * 21;

        // 램덤한 글자를 획득한다.
        let texts = [];

        for(let i = 1; i <= 21; i++) {
            const j = Math.floor(Math.random() * 28);
            const charCode = startCharCode + (19 * i * j);
            const c = String.fromCharCode(charCode);

            texts.push(c);
        }

        return {
            text: texts.join("").slice(0, 5)
        };

    }
}
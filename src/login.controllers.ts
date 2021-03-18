import {Controller, Get, Query} from "@nestjs/common";

@Controller("/login")
export class LoginController {

    @Get()
    login(@Query("id") id, @Query("pw") pw): string {
        return `id : ${id}, pw : ${pw}`;
    }
}
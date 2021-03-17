import {Controller, Get} from "@nestjs/common";

@Controller("mobile")
export class MobileController {
    @Get() 
    index(): string {
        return "mobile";
    }
}
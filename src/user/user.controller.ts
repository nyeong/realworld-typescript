import { Post, Body, Controller } from "@nestjs/common";
import { CreateUserDto } from './user.dto'
import { UserService } from "./user.service";

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('users')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData);
    }
}
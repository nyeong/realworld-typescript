/**
 * ### 컨벤션
 * - Service의 결과를 그대로 반환하지 않기
 *   - 추후 API의 응답 형태가 변경될 수 있기 때문에
 * - 결과를 destructuring하지 않고 감싸서 반환하기
 *   - 추후 어떤 데이터가 추가될지 모르기 때문에
 */

import { Post, Body, Controller, Get, NotImplementedException } from "@nestjs/common";
import { CreateUserDto, LogInUserDto } from './user.dto'
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body('user') userData: CreateUserDto) {
        const createdUser = await this.userService.create(userData);

        return {
            user: createdUser
        }
    }

    @Post('login')
    async login(@Body('user') userData: LogInUserDto) {
        const loggedInUser = await this.userService.login(userData);

        return {
            user: loggedInUser
        }
    }

    @Get()
    async find() {
        return this.userService.find();
    }
}
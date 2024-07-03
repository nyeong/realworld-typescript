import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/user/entities/user.entity";
import { InitialNameEntity } from "@/user/entities/initial-name.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, InitialNameEntity])],
    providers: [UserService],
    controllers: [
        UserController
    ]
})
export class UserModule { }
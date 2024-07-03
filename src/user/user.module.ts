/**
 * 기본적인 유저 정보와 인증을 다룹니다.
 */
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/user/entities/user.entity";
import { JwtModule, JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfig } from "@/config/common.config";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.registerAsync(
            {
                inject: [ConfigService],
                imports: [ConfigModule],
                useFactory: (configService: ConfigService): JwtModuleOptions => {
                    const config = configService.get<JwtConfig>('jwt')
                    if (!config) throw new Error('JWT configuration not found')
                    return {
                        global: true,
                        secret: config.secret,
                        signOptions: { expiresIn: '60s' }
                    }
                },
            },
        )],
    providers: [UserService],
    controllers: [
        UserController
    ]
})
export class UserModule { }
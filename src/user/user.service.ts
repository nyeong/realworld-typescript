import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto, LogInUserDto } from './user.dto'
import { validate } from 'class-validator'
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserBaseRO } from './user.ro';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    private buildUserRO(user: UserEntity) {
        const token = this.jwtService.sign({ email: user.email })

        return plainToClass(UserBaseRO, { ...user, token }, { excludeExtraneousValues: true })
    }

    /**
     * 유저 생성.
     * 
     * @param userData email, username, password를 받습니다.
     */
    async create(userData: CreateUserDto) {
        const { username, email, password } = userData

        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();

        if (user) {
            throw new HttpException('User already exists', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = UserEntity.new({ username, email, password })
        const errors = await validate(newUser)
        if (errors.length > 0) {
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const savedUser = await this.userRepository.save(newUser)
        return this.buildUserRO(savedUser)
    }

    /**
     * 
     * @param userData 
     * @returns 
     */
    async login(userData: LogInUserDto) {
        const { email, password } = userData

        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if (!await user.comparePassword(password)) {
            throw new HttpException('Invalid password', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return this.buildUserRO(user)
    }

    async update() {
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
    }

    async find() {
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
    }
}   
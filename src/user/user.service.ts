import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './user.dto'
import { validate } from 'class-validator'
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InitialNameEntity } from './entities/initial-name.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(InitialNameEntity)
        private readonly initialNameRepository: Repository<InitialNameEntity>
    ) { }

    private async getRandomInitialName() {
        const randomName = await this.initialNameRepository
            .createQueryBuilder('in')
            .select('in.name')
            .orderBy('RAND()')
            .limit(1)
            .getOne()
            .then((initialName) => initialName?.name)

        return randomName
    }

    /**
     * 유저 생성.
     * 
     * @param userData email, username, password를 받습니다.
     */
    async create(userData: CreateUserDto) {
        const { username, email, password } = userData

        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email })
            .getOne();

        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }

        const randomName = await this.getRandomInitialName()
        let newUser = new UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password
        newUser.shownName = randomName ?? username

        const errors = await validate(newUser)
        if (errors.length > 0) {
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST)
        } else {
            const savedUser = await this.userRepository.save(newUser)
            return savedUser
        }
    }
}   
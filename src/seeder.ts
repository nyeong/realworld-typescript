/**
 * DB에 초기값을 넣어줍니다
 * 
 * 아래 명령어로 실행할 수 있습니다
 * 
 * @example
 *     yarn run seed
 */
import { TypeOrmModule } from '@nestjs/typeorm'
import { seeder } from 'nestjs-seeder'
import { dataSource } from './config/database.config'
import { InitialNameSeeder } from './user/initial-name.seeder'
import { InitialNameEntity } from './user/entities/initial-name.entity'

seeder({
    imports: [
        // 데이터베이스 연결 설정
        TypeOrmModule.forRoot(dataSource),

        // 어떤 Entity를 Seeding할 것인지
        TypeOrmModule.forFeature([InitialNameEntity]),
    ]

    // 실행할 Seeder
}).run([InitialNameSeeder])
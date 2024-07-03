import { Factory } from 'nestjs-seeder';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * User의 초기값으로 사용할 이름을 설정합니다.
 */
@Entity('initial_name')
export class InitialNameEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Factory(faker => faker?.person.lastName())
    name: string
}
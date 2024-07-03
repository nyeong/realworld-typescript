import { Entity, Index, BaseEntity, Column, BeforeInsert, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm'
import { IsEmail, IsString, Matches, Length, IsNotEmpty } from 'class-validator'
import * as argon2 from 'argon2'
import type { Generated } from 'kysely-typeorm'

// TODO: user or users , User or UserEntity

/**
 * User Entity
 */
@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Generated<number>

    @Index({ unique: true })
    @Column('varchar', { length: 16, unique: true })
    @IsString()
    @Matches(/^[a-zA-Z0-9_]{4,16}$/)
    username: string;

    @Column()
    @Length(1, 20)
    shownName: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column({ default: '' })
    bio: string

    @Column({ default: '' })
    image: string

    @Column()
    @IsNotEmpty()
    password: string

    @UpdateDateColumn()
    updatedAt: Date

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    /**
     * DB에 저장할 때에는 비밀번호를 해싱하여 저장합니다.
     * 
     * ### 해싱 알고리즘
     * OWASP의 권고에 따라 Argon2id를 쓰자.
     * https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
     */
    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password, { type: argon2.argon2id, memoryCost: 19456, parallelism: 1, timeCost: 2 })
    }

    @BeforeInsert()
    async lowerCaseEmail() {
        this.email = this.email.toLowerCase()
    }

    @BeforeInsert()
    async lowerCaseUsername() {
        this.username = this.username.toLowerCase()
    }
}
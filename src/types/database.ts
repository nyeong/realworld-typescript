import type { UserEntity } from '@/user/entities/user.entity'
import { KyselifyEntity } from 'kysely-typeorm'

export type UserTable = KyselifyEntity<UserEntity>

export interface Database {
    user: UserTable
}
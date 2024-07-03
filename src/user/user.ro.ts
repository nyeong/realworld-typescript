/**
 * User의 Response Object에 대해 정의합니다
 */
import { Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator';

export class UserBaseRO {
    @Expose()
    @IsNotEmpty()
    readonly email: string;

    @Expose()
    @IsNotEmpty()
    readonly username: string;

    @Expose()
    readonly bio: string | null;

    @Expose()
    readonly image: string | null;

    @Expose()
    @IsNotEmpty()
    readonly token: string;

    constructor(partial: Partial<UserBaseRO>) {
        Object.assign(this, partial);
    }
}
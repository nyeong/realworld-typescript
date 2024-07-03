/**
 * User Entity에서 class-validator를 이용해 선언한 제약 정보를 가져와 재활용하고 싶지만... 그러면 Entity와 Dto간의 의존성이 높아져서 안티패턴이라고 한다.
 * 어떻게 하면 Dto와 Entity가 합리적으로 제약 조건을 공유할 수 있을까?
 */
import { PickType, PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class BaseUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    shownName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    image: string;

    bio: string;
}

export class CreateUserDto extends PickType(BaseUserDto, ['username', 'email', 'password'] as const) { }

export class UpdateUserDto extends PartialType(BaseUserDto, { skipNullProperties: true }) { }
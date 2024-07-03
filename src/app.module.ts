import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DevelopmentConfig } from './config/development.config';

// 기본적인 설정은 CommonConfig 클래스에 정의합니다.
// 각각의 환경에 대해서 오버라이딩 합니다
// * devlopment 환경 => DevelopmentConfig
// * test 환경 => TestConfig
// * production 환경 => ProductionConfig
// 여기만 바꿔주면 밑에는 고칠 필요가 없습니다.
const config = new DevelopmentConfig()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validate: (config) => ({
        port: parseInt(config.PORT, 10) || 3000,
      }),
      load: [
        config.databaseConfig(),
        config.jwtConfig()
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<TypeOrmModuleOptions>('database')
        if (!config) throw new Error('Database configuration not found')
        return config
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    UserModule
  ],
})
export class AppModule { }

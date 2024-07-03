import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/database.config';
import { UserModule } from './user/user.module';

const typeOrmModule = TypeOrmModule.forRoot(dataSource)

const config = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  validate: (config) => ({
    port: parseInt(config.PORT, 10) || 3000,
  }),
})

@Module({
  imports: [config, typeOrmModule, UserModule],
})
export class AppModule { }

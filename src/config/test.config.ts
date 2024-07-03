import { DataSourceOptions } from "typeorm";
import { join } from 'node:path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { CommonConfig } from "./common.config";

export class TestConfig extends CommonConfig {
    readonly database: DataSourceOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'password',
        database: 'db',
        synchronize: true,
        entities: [join(__dirname, '../**/*.entity.{ts,js}'), join(__dirname, '../**/entities/*.{ts,js}')],
        namingStrategy: new SnakeNamingStrategy(),
    }
}
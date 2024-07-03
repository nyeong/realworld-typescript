import { registerAs } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";

export type DatabaseConfig = DataSourceOptions
export type JwtConfig = {
    secret: string
}

export class CommonConfig {
    protected readonly database: DatabaseConfig
    protected readonly jwt: JwtConfig

    databaseConfig() {
        return registerAs('database', () => this.database)
    }

    jwtConfig() {
        return registerAs('jwt', () => this.jwt)
    }
}
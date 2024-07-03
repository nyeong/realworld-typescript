import { join } from 'node:path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Kysely, MysqlAdapter, MysqlIntrospector, MysqlQueryCompiler } from "kysely";
import { Database } from "@/types/database"
import { KyselyTypeORMDialect } from "kysely-typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSource: DataSourceOptions = {
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

export const kysely = new Kysely<Database>({
    dialect: new KyselyTypeORMDialect({
        kyselySubDialect: {
            createAdapter: () => new MysqlAdapter(),
            createIntrospector: (db) => new MysqlIntrospector(db),
            createQueryCompiler: () => new MysqlQueryCompiler(),
        },
        typeORMDataSource: new DataSource(dataSource)
    }),
})
/**
 * InitialNameEntity에 대한 초기값을 설정합니다.
 */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Seeder, DataFactory } from "nestjs-seeder";
import { Repository } from "typeorm";
import { InitialNameEntity } from "./entities/initial-name.entity";

@Injectable()
export class InitialNameSeeder implements Seeder {
    constructor(
        @InjectRepository(InitialNameEntity)
        private readonly initialNameRepository: Repository<InitialNameEntity>
    ) { }

    async seed() {
        const initialNames = DataFactory.createForClass(InitialNameEntity).generate(10);
        return this.initialNameRepository.save(initialNames)
    }

    drop() {
        return this.initialNameRepository.delete({})
    }
}
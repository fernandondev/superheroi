import { MigrationInterface, QueryRunner } from "typeorm";
let fs = require('fs');

export class  $npmConfigName1714435674377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let ddlsHeroAttribute = fs.readFileSync('src/database/dataset-superheroi/02_hero_attribute.sql').toString();
        await queryRunner.query( ddlsHeroAttribute );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

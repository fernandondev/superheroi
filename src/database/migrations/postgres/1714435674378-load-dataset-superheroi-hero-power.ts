import { MigrationInterface, QueryRunner } from "typeorm";
let fs = require('fs');

export class  $npmConfigName1714435674378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let ddlsHeroPower = fs.readFileSync( 'src/database/dataset-superheroi/03_hero_power.sql').toString();
        await queryRunner.query(ddlsHeroPower);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

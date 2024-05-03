import { MigrationInterface, QueryRunner } from "typeorm";
let fs = require('fs');

export class  $npmConfigName1714435674376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let ddlsReferenceData = fs.readFileSync('src/database/dataset-superheroi/01_reference_data.sql').toString();
        await queryRunner.query( ddlsReferenceData );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}

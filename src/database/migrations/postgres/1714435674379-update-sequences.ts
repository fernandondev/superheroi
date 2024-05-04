import { MigrationInterface, QueryRunner } from "typeorm";
let fs = require('fs');

export class  $npmConfigName1714435674379 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER SEQUENCE public.superpower_id_seq
        RESTART 168;	
        ALTER SEQUENCE public.superhero_id_seq
        RESTART 757;	
        ALTER SEQUENCE public.attribute_id_seq
        RESTART 7;
    
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1714435674374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "usuarios" (
                id uuid NOT NULL default uuid_generate_v4(),
                cpf varchar(30),
                nome varchar(256) NOT NULL,
                email varchar(256) NOT NULL,
                senha varchar(256) NOT NULL,
                foto_imagem TEXT default NULL,
                criado_em timestamp default NULL,
                iat_ultimo_token timestamp default NULL,
                ativo boolean default true,
                CONSTRAINT user_pk_id PRIMARY KEY (id),
                CONSTRAINT user_un_username UNIQUE (cpf)
            );
            CREATE INDEX idx_cpf_usuarios on usuarios(cpf);
            CREATE INDEX idx_email_usuarios on usuarios(email);
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS TASK;`);
    }

}

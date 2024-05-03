import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'usuarios'})
export class UsuarioEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    cpf: string;

    @Column({type: 'varchar'})
    nome: string;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'text'})
    senha: string;

    @Column({type: 'varchar', name: 'foto_imagem'})
    fotoBase64: string;

    @CreateDateColumn({name:'criado_em'})
    criadoEm: Date;

    @CreateDateColumn({name:'iat_ultimo_token'})
    iatUltimoToken: Date;

    @Column({ type: 'boolean', name: 'ativo' })
    ativo: boolean;

}
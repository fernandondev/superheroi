import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ database: 'POSTGRES', name: 'attribute'})
export class AtributoEntity {

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({type: 'varchar', name: 'attribute_name'})
    nomeAtributo: string;

}
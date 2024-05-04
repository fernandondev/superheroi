import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
export declare class AtributoEntity {
    id: bigint;
    nomeAtributo: string;
    heroiAtributos: HeroiAtributoEntity[];
}

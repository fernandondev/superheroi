import { AtributoEntity } from 'src/database/entities/postgres/atributo.entity';
import { SuperHeroiEntity } from './super.heroi.entity';
export declare class HeroiAtributoEntity {
    idHeroi: bigint;
    idAtributo: bigint;
    valorAtributo: number;
    superHeroi: SuperHeroiEntity;
    atributo: AtributoEntity;
}

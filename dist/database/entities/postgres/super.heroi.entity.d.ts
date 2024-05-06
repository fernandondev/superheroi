import { HeroiAtributoEntity } from 'src/database/entities/postgres/heroi.atributo.entity';
import { GeneroEntity } from './genero.entity';
import { CorEntity } from './cor.entity';
import { RacaEntity } from './raca.entity';
import { EditoraEntity } from './editora.entity';
import { AlinhamentoEntity } from './alinhamento.entity';
import { HeroiPoderEntity } from './heroi.poder.entity';
export declare class SuperHeroiEntity {
    id: bigint;
    nomeSuperHeroi: string;
    nomeCompleto: string;
    genero: GeneroEntity;
    corDoOlho: CorEntity;
    corDoCabelo: CorEntity;
    corDaPele: CorEntity;
    raca: RacaEntity;
    editora: EditoraEntity;
    alinhamento: AlinhamentoEntity;
    altura: number;
    peso: number;
    heroiAtributos: HeroiAtributoEntity[];
    heroiPoderes: HeroiPoderEntity[];
}

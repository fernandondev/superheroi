import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { SuperHeroiEntity } from "./super.heroi.entity";
import { PoderEntity } from "./poder.entity";


@Entity({ database: 'POSTGRES', name: 'hero_power'})
export class HeroiPoderEntity{

    @PrimaryColumn({ type:'int8', name:'hero_id' })
    idHeroi: bigint;

    @PrimaryColumn({ type:'int8', name:'power_id' })
    idPoder: bigint;

    @ManyToOne(() => SuperHeroiEntity, (superHeroi) => superHeroi.heroiPoderes)
    @JoinColumn({ name: 'hero_id' })
    superHeroi: SuperHeroiEntity

    @ManyToOne(() => PoderEntity, (poder) => poder.heroiPoderes, {eager: true}) 
    @JoinColumn({ name: 'power_id' })
    poder: PoderEntity

}
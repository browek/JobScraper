import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Offer } from "./Offer";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    // @OneToMany()
    // offers: Offer;
}
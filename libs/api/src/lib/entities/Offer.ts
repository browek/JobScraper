import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

@Entity()
export class Offer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    link: string;

    @Column({nullable: true})
    name: string;
    
    @Column({nullable: true})
    salary: string;

    // @ManyToOne()
    // company: Company
}
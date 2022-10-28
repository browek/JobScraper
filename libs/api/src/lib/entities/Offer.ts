import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

@Entity()
export class Offer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({unique: true})
    link: string;
    
    @Column()
    salary: string;

    // @ManyToOne()
    // company: Company
}
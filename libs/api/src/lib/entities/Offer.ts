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
    
    @Column({nullable: true})
    expLvl: string;

    @Column({nullable: true})
    company: string
    
    @Column("simple-json", {nullable: true})
    techStack: {key: string}

}



 
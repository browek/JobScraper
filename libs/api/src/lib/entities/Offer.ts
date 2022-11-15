import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

export enum Status {
    NEW = 'New',
    ACTIVE = 'Active',
    SENT = 'Sent',
    REJECTED = 'Rejected',
    ARCHIVED = 'Archived'
  }

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
    company: string;
    
    @Column({nullable: true})
    img: string;
    
    @Column("simple-json", {nullable: true})
    techStack: {key: string}

    @Column({
        type: "enum",
        enum: Status,
        default: Status.NEW
    })
    status: Status;
}



 
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
    NEW = 'New',
    ACTIVE = 'Active',
    SENT = 'Sent',
    REJECTED = 'Rejected',
  }

@Entity()
export class Offer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
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

    @Column({default: false})
    archived: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    lastUpdate: Date;
}


 
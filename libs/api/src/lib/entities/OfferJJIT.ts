import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
    NEW = 'New',
    ACTIVE = 'Active',
    SENT = 'Sent',
    REJECTED = 'Rejected',
  }

@Entity()
export class OfferJJIT {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    link: string;

    @Column({nullable: false})
    name: string;
    
    @Column({nullable: true})
    salary: string;
    
    @Column({nullable: true})
    expLvl: string;

    @Column({nullable: false})
    company: string;
    
    @Column({nullable: false})
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


 
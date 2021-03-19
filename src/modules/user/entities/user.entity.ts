import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    @Generated()
    public id: string;

    @Column({
        unique: true
    })
    public username: string;

    @Column({
        unique: true,
    })

    public email: string;

    @Column({
        select: false
    })
    public password: string;

    @Column()
    public name: string;

    @Column()
    public salt: string;
    
}
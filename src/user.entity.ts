import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])

export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword(): Promise<void>{
        this.password = await bcrypt.hash(this.password, 10);
    };

    async comparePassword(password: string): Promise<boolean>{
        return await bcrypt.compare(password, this.password);
    }

}
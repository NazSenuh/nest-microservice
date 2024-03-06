import { ProfileStatus, Role } from '@common/types'
import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column('varchar')
    public username: string

    @Column('varchar')
    public email: string

    @Exclude()
    @Column('varchar')
    public password: string

    @Column({ type: 'enum', enum: ProfileStatus, default: ProfileStatus.PENDING })
    public status: ProfileStatus

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    public role: Role

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date
}

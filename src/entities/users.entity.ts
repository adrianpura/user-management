import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'First Name' })
  @Column()
  first_name: string;

  @ApiProperty({ type: String, description: 'Last Name' })
  @Column()
  last_name: string;

  @ApiProperty({ type: String, description: 'address' })
  @Column()
  address: string;

  @ApiProperty({ type: Number, description: 'Post Code' })
  @Column()
  post_code: number;

  @ApiProperty({ type: Number, description: 'Contact Number' })
  @Column()
  contact_number: number;

  @ApiProperty({ type: String, description: 'Email' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ type: String, description: 'username' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @ApiProperty({ type: String, description: 'Password' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @CreateDateColumn()
  updated_at?: Date;
}

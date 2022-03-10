import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("media")
export class Media extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 10, comment: "매체 이름"})
  name: string;

  @Column({type: "bool",  comment: "가시성"})
  is_visible: boolean;

  @CreateDateColumn()
  created_at: Date;
}


import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("growth")
export class Growth extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 10, comment: "제목"})
  title: string;

  @Column({type: "bool",  comment: "가시성"})
  is_visible: boolean;

  @Column({type: "varchar", length: 1000, comment: "본문"})
  content: string;

  @CreateDateColumn()
  created_at: Date;
}



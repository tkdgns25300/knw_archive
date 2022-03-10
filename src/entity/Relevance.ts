import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("relevance")
export class Relevance extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 10, comment: "관련성 이름"})
  name: string;

  @Column({type: "bool",  comment: "가시성"})
  is_visible: boolean;

  @CreateDateColumn()
  created_at: Date;
}


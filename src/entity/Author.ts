import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("author")
export class Author extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 10, comment: "작가 성명"})
  name: string;

  @Column({type: "bool",  comment: "가시성"})
  is_visible: boolean;

  @CreateDateColumn()
  created_at: Date;
}


import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn,  OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {ProofItem} from "./ProofItem";

@Entity("chronology_item")
export class ChronologyItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 10, comment: "나이"})
  age: string;

  @Column({type: "varchar", length: 10, comment: "연도"})
  period: string;

  @Column({type: "text", comment: "증거 자료 본문 내용"})
  content: string;

  @OneToMany(() => ProofItem, (detail) => detail.chronology_id,
      {cascade: true})
  proof_items: ProofItem[];

  @Column({type: "bool",  comment: "가시성"})
  is_visible: boolean;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {ChronologyItem} from "./ChronologyItem";

@Entity("proof_item")
export class ProofItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

 // @Column({ type: "int", name: "chronology_id", default: null, nullable: true })
  // when this line is commented column does not appear, otherwise column shows but there is another colum too since JoinColumn creates column too
  @ManyToOne(() => ChronologyItem, (c) => c.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn({ name: "chronology_id" })
  chronology_id: number;

  @Column({type: "text", comment: "파일 주소"})
  file_src: string;

  @Column({type: "varchar", length: 50, comment: "파일 이름", default: " "})
  file_name: string;

  @Column({type: "varchar", length: 200, comment: "상세정보 링크"})
  reference: string;

  @Column({type: "text", comment: "본문 내용"})
  content: string;

  @Column({type: "bool",  comment: "가시성"})
  is_visible: boolean;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

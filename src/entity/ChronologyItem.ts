import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Author} from "./Author";

@Entity("chronology_item")
export class ChronologyItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "author_id", default: null, nullable: true, comment: "작가 아이디(UI상 드롭다운으로 구현)" })
  @ManyToOne(() => Author, (author) => author.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author_id: number;

  @Column({type: "varchar", length: 100, comment: "자료 출처 텍스트"})
  ref_text: string;

  @Column({type: "text", comment: "증거 자료 본문 내용"})
  ref_content: string;

  @Column({type: "varchar", length: 200, comment: "상세 정보 버튼을 눌렀을 때 사용될 외부 사이트 연결 링크"})
  href: string;

  @Column({type: "varchar", length: 200, comment: "첨부된 이미지가 있는 경우 해당 이미지의 주소"})
  img_src: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

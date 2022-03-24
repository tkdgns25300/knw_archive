import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("work_item")
export class WorkItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 200, comment: "자료 출처 텍스트"})
  title: string;

  @CreateDateColumn()
  publish_date: Date;

  @Column({type: "varchar", length: 10, comment: "발표지면"})
  publish_media: string;

  @Column({type: "text", comment: "증거 자료 본문 내용"})
  ref_content: string;

  @Column({type: "varchar", length: 200, comment: "상세 정보 버튼을 눌렀을 때 사용될 외부 사이트 연결 링크"})
  href: string;

  @Column({type: "varchar", length: 200, comment: "첨부된 이미지가 있는 경우 해당 이미지의 주소"})
  img_src: string;

  @Column({type: "varchar", length: 10, comment: "장르"})
  genre: string;
//TODO: image reference
  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}



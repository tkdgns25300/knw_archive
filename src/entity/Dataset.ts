import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("dataset")
export class Dataset extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 200, comment: "제목"})
  title: string;

  @Column({type: "varchar", length: 200, comment: "부가 설명"})
  description: string;

  @Column({type: "varchar", length: 100, comment: "기관"})
  organization: string;

  @Column({type: "varchar", length: 200, comment: "서비스 유형"})
  service: string;

  @Column({type: "varchar", length: 200, comment: "첨부된 파일 있는 경우 해당 파일의 주소"})
  file_src: string;

  @Column({type: "bool",  comment: "가시성"})
  is_visible: boolean;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}



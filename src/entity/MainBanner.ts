import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("main_banner")
export class MainBanner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 200, comment: "배너 이미지의 주소"})
  img_src: string;
  @Column({type: "varchar", length: 20, comment: "제목"})
  title: string;
  @Column({type: "smallint", default: 1, comment: "노출 순서 "})
  order: number;
  @Column({type: "varchar", length: 200, comment: "설명 "})
  description: string;
  @CreateDateColumn()
  updated_at: Date;
  @CreateDateColumn()
  created_at: Date;
}


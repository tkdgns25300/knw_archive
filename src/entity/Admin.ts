import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("admin")
export class Admin extends BaseEntity {
  @PrimaryColumn({
    type: "varchar",
    length: "40",
    unique: true,
    comment: "관리자 아이디",
  })
  admin_id: string;

  @Column({
    type: "varchar",
    length: 130,
    comment: "관리자 비밀번호",
    select: false,
  })
  password: string;

  @CreateDateColumn()
  created_at: Date;
}

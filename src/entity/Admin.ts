import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { IsDate, IsString, IsBoolean } from "class-validator";
import { BaseEntity } from "./BeseEntity";

@Entity("admin")
export class Admin extends BaseEntity {
  @IsString()
  @PrimaryColumn({
    type: "varchar",
    length: "40",
    unique: true,
    comment: "관리자 아이디",
  })
  admin_id: string;

  @IsString()
  @Column({
    type: "varchar",
    length: 129,
    comment: "관리자 패스워드",
    select: false,
  })
  password: string;

  @IsString()
  @Column({ type: "varchar", length: 40, comment: "관리자 이름" })
  name: string;

  @IsDate()
  @Column({
    type: "datetime",
    default: null,
    nullable: true,
    comment: "최근 접속 일시",
  })
  last_login: Date;

  @IsBoolean()
  @Column({
    type: "boolean",
    default: false,
    comment: "super관리자인 경우 true",
  })
  is_super: boolean;

  @IsDate()
  @CreateDateColumn()
  created_at: Date;
}

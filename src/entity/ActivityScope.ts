import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Author} from "./Author";
import {Media} from "./Media";
import {Relevance} from "./Relevance";


@Entity("activity_scope")
export class ActivityScope extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "smallint", name: "media", default: null, nullable: true, comment: "작가 아이디(UI상 드롭다운으로 구현)" })
  @ManyToOne(() => Media, (media) => media.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "media" })
  media: number;

  @Column({ type: "smallint", name: "relevance",  comment: "작가 아이디(UI상 드롭다운으로 구현)" })
  @ManyToOne(() => Relevance, (rel) => rel.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "relevance" })
  relevance: number;

  @Column({ type: "int", name: "author_id", default: null, nullable: true, comment: "작가 아이디(UI상 드롭다운으로 구현)" })
  @ManyToOne(() => Author, (author) => author.name, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author_id: number;

  @Column({type: "varchar", length: 4, default: null, nullable: true, comment: " "})
  start_year: string;

  @Column({type: "varchar", length: 4, default: null, nullable: true, comment: " "})
  end_year: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

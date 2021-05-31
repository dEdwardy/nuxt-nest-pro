import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "../article/article.entity";
import { Tag } from "../tag/tag.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  name:string;

  @OneToMany(type => Tag, tag => tag.category)
  tag:Tag[];

  @OneToMany(type => Article, article => article.category)
  article:Article[];

  @CreateDateColumn()
  created:Date;

  @UpdateDateColumn()
  updated:Date;
}

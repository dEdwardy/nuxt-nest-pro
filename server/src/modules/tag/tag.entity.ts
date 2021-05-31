import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "../article/article.entity";
import { Category } from "../category/category.entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column({ unique: true})
  name:string;

  @ManyToOne(type => Category, category => category.tag)
  category:Category;

  @ManyToMany(type => Article,article => article.tag)
  article:Article;

  @CreateDateColumn()
  created:Date;

  @UpdateDateColumn()
  updated:Date;
}

import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Article } from "../article/article.entity";
import { User } from "../user/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Article, article => article.comment)
  article: Article;

  @ManyToOne(type => User, user => user.comment, { nullable: false })
  from: User;

  @ManyToOne(type => User, user => user.comment, { nullable: false })
  to: User;

  @Column()
  content: string;

  @CreateDateColumn()
  created: Date;
}

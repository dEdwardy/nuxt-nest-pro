import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { ArticleState } from 'server/src/core/interfaces/enums/article-state.enum';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '标题', length: 100 })
  title: string;

  @Column('longtext',{ comment:'内容' })
  content: string;

  @Column({ comment:'简要内容',length:200 })
  brief_content: string;

  @Column({ comment: '状态'})
  state: ArticleState;

  @ManyToOne(type => User, user =>user.article)
  author:User;

  @ManyToMany(type => User, user => user.like)
  liked:User;

  @Column({ default:0})
  read_num:number;

  @CreateDateColumn({ comment: '创建日期' })
  created: Date;

  @UpdateDateColumn({ comment: '修改日期' })
  updated: Date;

  @ManyToOne(type => Category, category => category.article)
  category:Category;

  @ManyToMany(type => Tag, tag => tag.article)
  @JoinTable()
  tag:Tag[];

  @OneToMany(type => Comment, comment => comment.article)
  comment:Comment[];

}

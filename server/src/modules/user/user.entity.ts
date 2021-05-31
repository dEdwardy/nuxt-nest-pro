import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Article } from '../article/article.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '用户名', unique: true, length: 50 })
  username: string;

  // 查询忽略敏感信息
  @Exclude()
  @Column({ comment: '密码', length: 50, select: false })
  password: string;

  @Column({ comment: '电话', length: 50, unique: true, select: false })
  phone: string;

  @Column({ comment: '邮箱', length: 50, unique: true, select: false })
  email: string;

  @Column({ length: 50 })
  company: string;

  @Column({ length: 50 })
  position: string;

  @Column({ length: 200 })
  desc: string;

  @CreateDateColumn({ comment: '创建日期' })
  created: Date;

  @UpdateDateColumn({ comment: '修改日期' })
  updated: Date;

  @OneToMany(type => Article, article => article.author)
  article:Article[];

  @ManyToMany(type => Article, article => article.liked)
  @JoinTable()
  like:Article[]

  @OneToMany(type => Comment, comment => comment.from)
  comment: Comment[];

}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'Banner路径'})
  url: string;


  @Column({ comment:'排序' })
  sort: Number;

}

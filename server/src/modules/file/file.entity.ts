import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  filename: string

  @Column()
  mimetype: string

  @Column()
  size: number

  @Column()
  url: string
}

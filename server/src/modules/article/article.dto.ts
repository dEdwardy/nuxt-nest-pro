import { ApiProperty } from '@nestjs/swagger';
import { ArticleState } from 'server/src/core/interfaces/enums/article-state.enum'
import { Tag } from '../tag/tag.entity'
import { User } from '../user/user.entity'

export class ArticleDto {
  readonly id?: string
  readonly title: string
  readonly content: string
  readonly brief_content: string
  state: ArticleState = ArticleState.DRAFT
  author: User
  tag: Tag[]
}
export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
interface SortBy<sortKey = 'created', sortValue = SortEnum.DESC> {
  sortKey: string
  sortValue: SortEnum
}
export class QueryDto {
  @ApiProperty({ description:'排序', example: 'DESC'})
  sortBy?: SortBy
  @ApiProperty({ description:'分类', example: 1})
  category?: string
  @ApiProperty({ description:'关键字'})
  query?: string
  @ApiProperty({ description:'标签'})
  tag?:number[]
  @ApiProperty({ description:'每页条数',example:10})
  limit?:number
  @ApiProperty({ description:'当前页数'})
  page?:number
}

import { ArticleState } from "server/src/core/interfaces/enums/article-state.enum"
import { Tag } from "../tag/tag.entity"
import { User } from "../user/user.entity"

export class ArticleDto {
  readonly id?: string
  readonly title: string
  readonly content: string
  readonly brief_content: string
  state: ArticleState = ArticleState.DRAFT
  author:User
  tag:Tag[]
}

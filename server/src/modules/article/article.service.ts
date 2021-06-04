import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleState } from 'server/src/core/interfaces/enums/article-state.enum'
import { Repository } from 'typeorm'
import { TagService } from '../tag/tag.service'
import { ArticleDto } from './article.dto'
import { Article } from './article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagService: TagService
  ) { }
  //保存草稿
  async saveArticle (article: ArticleDto) {
    if (article.state !== ArticleState.DRAFT) article.state = ArticleState.DRAFT
    const tag = await this.tagService.find(article.tag)
    article.tag = tag
    return this.articleRepository.save(article)
  }
  //正式发布
  async publishArticle (article) {
    const { id, title, content, brief_content, category, tag } = article
    const tagEntity = await this.tagService.find(tag)
    if (id) {
      //update state
      // return this.articleRepository.update({ state: ArticleState.PUBLISHED},{ id })
      const entity = await this.articleRepository.findOne(id)
      if (title) entity.title = title
      if (title) entity.content = content
      if (title) entity.brief_content = brief_content
      if (title) entity.category = category
      if (title) entity.tag = tagEntity
      entity.state = ArticleState.PUBLISHED
      return this.articleRepository.save(entity)
    } else {
      article.state = ArticleState.PUBLISHED
      article.tag = tagEntity
      return this.articleRepository.save(article)
    }
  }
  queryAndCount () {
    return this.articleRepository.findAndCount({ relations: ['tag', 'category'] })
  }
  getOneById (id: string) {
    return this.articleRepository.findOne(id,{ relations: ['tag', 'category']})
  }
}

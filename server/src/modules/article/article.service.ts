import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Console } from 'console'
import { ArticleState } from 'server/src/core/interfaces/enums/article-state.enum'
import { In, Repository } from 'typeorm'
import { TagService } from '../tag/tag.service'
import { ArticleDto, QueryDto, SortEnum } from './article.dto'
import { Article } from './article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagService: TagService
  ) {}
  //保存草稿
  async saveArticle(article: ArticleDto) {
    if (article.state !== ArticleState.DRAFT) article.state = ArticleState.DRAFT
    const tag = await this.tagService.findByIds(article.tag)
    article.tag = tag
    return this.articleRepository.save(article)
  }
  //正式发布
  async publishArticle(article) {
    const { id, title, content, brief_content, category, tag } = article
    const tagEntity = await this.tagService.findByIds(tag)
    console.log(tag)
    console.log(tagEntity)
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
      const { id,...data } = article
      data.state = ArticleState.PUBLISHED
      data.tag = tagEntity
      return this.articleRepository.save(data)
    }
  }
  queryAndCount(
    query: QueryDto = {
      sortBy: { sortKey: 'created', sortValue: SortEnum.DESC },
    }
  ) {
    const {
      sortBy: { sortKey , sortValue },
      category,
    } = query
    console.log(sortKey, sortValue,category)
    return category
      ? this.articleRepository.findAndCount({
          relations: ['tag', 'category','author'],
          where: { category: { id: In(category) } },
          order: { [sortKey]: sortValue },
        })
      : this.articleRepository.findAndCount({
          relations: ['tag', 'category','author'],
          order: { [sortKey]: sortValue },
        })
  }
  getOneById(id: string) {
    return this.articleRepository.findOne(id, {
      relations: ['tag', 'category','author'],
    })
  }
}

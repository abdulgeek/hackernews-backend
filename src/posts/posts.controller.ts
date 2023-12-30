/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.postsService.findAll({ page, limit });
  }
}

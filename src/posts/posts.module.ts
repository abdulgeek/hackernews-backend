/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { CronJob } from 'cron';
import { PostsController } from './posts.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    ],
    providers: [PostsService],
    controllers: [PostsController],
})

export class PostsModule implements OnModuleInit {
    constructor(private readonly postsService: PostsService) { }

    async onModuleInit() {
        await this.postsService.scrapePosts();

        new CronJob('0 0 * * *', async () => {
            await this.postsService.scrapePosts();
        }, null, true, 'UTC');
    }
}
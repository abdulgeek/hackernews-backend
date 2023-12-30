/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
    private readonly logger = new Logger(PostsService.name);

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async scrapePosts(): Promise<void> {
        try {
            const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
            this.logger.debug("Fetching top stories from Hacker News");
            const storyIds = (await axios.get(topStoriesUrl)).data.slice(0, 30);

            const storyPromises = storyIds.map(async (id: any) => {
                try {
                    const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                    return storyResponse.data;
                } catch (error) {
                    this.logger.error(`Error fetching story with ID ${id}:`, error);
                    return null;
                }
            });

            const stories = (await Promise.all(storyPromises)).filter(story => story !== null);
            const formattedPosts = stories.map(story => ({
                title: story.title,
                author: story.by,
                time: new Date(story.time * 1000),
                url: story.url,
                hnId: story.id,
            }));

            for (const post of formattedPosts) {
                await this.postModel.updateOne({ hnId: post.hnId }, post, { upsert: true });
            }

            this.logger.debug(`Updated/Inserted posts: ${formattedPosts.length}`);
        } catch (error) {
            this.logger.error("Error occurred in scrapePosts:", error);
            throw error;
        }
    }

    async findAll(paginationQuery: { page: number; limit: number }): Promise<Post[]> {
        const { page, limit } = paginationQuery;
        try {
            return this.postModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
        } catch (error) {
            this.logger.error("Error occurred in findAll:", error);
            throw error;
        }
    }
}

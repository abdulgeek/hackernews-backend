/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    title: String,
    author: String,
    time: Date,
    url: String,
    hnId: Number,
});

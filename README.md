# Backend - NestJS Application

## Project Overview

This project is a backend service built with NestJS. It includes an API for fetching and displaying the latest 30 posts from Hacker News, and a cron job that scrapes new posts daily.

## Project Structure

- `src/`
  - `posts/` - Contains the posts module, service, and controller.
    - `posts.controller.ts` - Controller for handling requests to the posts endpoint.
    - `posts.service.ts` - Service for business logic, including scraping and retrieving posts.
    - `schemas/` - Mongoose schemas for the posts.
  - `app.module.ts` - Root module of the application.
  - `main.ts` - Entry point of the application.
- `test/` - Contains e2e tests.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Configuration**:
  Create a .env file in the root directory with the following content (update values as needed):
   ```bash
   MONGODB_URI=mongodb://username:password@host:port/database
   ```
3. **Running the Application:**
   For development:   
    ```bash
   npm run dev
   ```
   For production:
    ```bash
   npm run start:prod
   ```
4. **Running Tests:**
   Execute the tests using the following command:
    ```bash
   npm test
   ```

**API Endpoints**
`GET /posts: Fetches the latest 30 posts.`

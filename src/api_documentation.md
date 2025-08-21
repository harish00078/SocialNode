# API Documentation

This document provides a summary of all the API endpoints available in the SocialNode application.

## Authentication API

Base Path: `/api/auth`

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| POST   | `/register`   | Register a new user.     |
| POST   | `/login`      | Log in an existing user. |
| POST   | `/refresh`    | Refresh an access token. |

## Users API

Base Path: `/api/users`

| Method | Endpoint      | Description                  |
|--------|---------------|------------------------------|
| GET    | `/me`         | Get the current user's profile. |
| PUT    | `/me`         | Update the current user's profile. |

## Posts API

Base Path: `/api/posts`

| Method | Endpoint          | Description                               |
|--------|-------------------|-------------------------------------------|
| GET    | `/`               | Get a feed of posts.                      |
| GET    | `/user/:userId`   | Get all posts by a specific user.         |
| POST   | `/`               | Create a new post.                        |
| PUT    | `/:id`            | Update an existing post.                  |
| DELETE | `/:id`            | Delete a post.                            |

## Comments API

Base Path: `/api/comments`

| Method | Endpoint      | Description                               |
|--------|---------------|-------------------------------------------|
| GET    | `/:postId`    | Get all comments for a specific post.     |
| POST   | `/`           | Create a new comment on a post.           |
| DELETE | `/:id`        | Delete a comment.                         |

## Likes API

Base Path: `/api/likes`

| Method | Endpoint          | Description                               |
|--------|-------------------|-------------------------------------------|
| GET    | `/:postId/count`  | Get the number of likes for a post.       |
| POST   | `/like`           | Like a post.                              |
| POST   | `/unlike`         | Unlike a post.                            |

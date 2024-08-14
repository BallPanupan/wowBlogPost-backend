# Web Blog: Assignment

## Description

Web projects can post new topics and comment within the topic.


## Features

- member 
  - Sign In with only username

- Topic or new Post
  - Edit 
  - Delete
  - comment


## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18.19.0 or later)
- npm (v9.6.0 or later) or yarn (v1.22.0 or later)
- MongoDB (v7 or later)

## libraries or dependencies
- 

## Installation FontEnd with Nextjs

### 1. Clone the repository

```bash
git https://github.com/BallPanupan/wowBlogPost-backend
cd your-repository-name
```

### 2. update .env file 
```bash
JWT_SECRET=
SERVER_PORT=
MONGODB_URI=
```

### 3. Install database or restore
  - create new docker container (version: 7)
  - mongorestore, I have attached the database backup file, file name: `wowBlogPost-db.tar`

```
mongorestore --uri="" --db=wowBlogPost /{path backup}

```

### 4. Start the project in development mode
```
npm run start:dev                                                
```
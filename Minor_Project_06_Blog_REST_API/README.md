# Blog REST API — Minor Project 06

A modular Blog REST API using Node.js and Express.js. It implements Create, Read, Update and Delete (CRUD) operations. Data is stored in `data/posts.json` and persists after server restarts.

## Features
- Create a post with title, content, authorName, category and generated createdDate.
- Get all posts; get one post by ID; update allowed fields; delete by ID.
- JSON responses, validation, useful errors and HTTP status codes.
- Modular routes, controllers, middleware, validation utility and JSON storage service.
- Bonus: search, category/author filtering and pagination.

## Structure
```text
├── controllers/postController.js
├── data/posts.json
├── middleware/errorHandler.js
├── middleware/notFound.js
├── routes/postRoutes.js
├── services/postStorage.js
├── utils/validatePost.js
├── app.js
├── server.js
├── package.json
└── README.md
```

## Setup
Install Node.js LTS, then open this folder in VS Code and run:
```bash
npm install
npm run dev
```
If nodemon is unavailable, run `npm start`. Server: `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

## API endpoints
Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/posts` | Create a post |
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get one post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

### Create post — POST /posts
In Postman choose Body → raw → JSON:
```json
{
  "title": "My First Blog",
  "content": "This is my first blog post.",
  "authorName": "Your Name",
  "category": "Technology"
}
```
Expected: `201 Created`. The API generates the ID and dates.

### Get all — GET /posts
Optional filters: `?search=node`, `?category=Technology`, `?author=Your`, `?page=1&limit=5`.

### Get one — GET /posts/POST_ID
Use the ID returned by create. Expected `200`; unknown ID returns `404`.

### Update — PUT /posts/POST_ID
```json
{"title":"Updated Blog Title","category":"Programming"}
```
One or more fields can be updated. Expected `200`; invalid data `400`; unknown ID `404`.

### Delete — DELETE /posts/POST_ID
Expected `200`; unknown ID returns `404`.

## Status codes
- `200 OK`: read/update/delete successful.
- `201 Created`: post created.
- `400 Bad Request`: input validation failed.
- `404 Not Found`: post or route not found.
- `500 Internal Server Error`: unexpected server error.

## Postman / Thunder Client testing
1. Create valid post → 201.
2. Get all posts → 200.
3. Get the created post by ID → 200.
4. Update its title → 200.
5. Delete it → 200.
6. Request deleted ID → 404.
7. Create with missing title → 400.
8. Try an unknown route → 404.
9. Test search/filter/pagination.
10. Restart server and GET posts to verify JSON persistence.

## GitHub upload
Create an empty GitHub repository and run from this folder (replace URL):
```bash
git init
git add .
git commit -m "Complete Minor Project 06 Blog REST API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```
If origin already exists, use `git remote -v`, then `git remote set-url origin YOUR_REPOSITORY_URL`.

## Storage note
The assignment permits in-memory, JSON file or MongoDB storage. This version uses JSON file storage; MongoDB is a bonus feature, not a requirement. For production, use a database and handle concurrent writes.

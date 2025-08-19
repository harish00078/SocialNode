# SocialNode API (Node v20, Express, MongoDB)

A modernized social media API (Codeial-style) compatible with **Node 20**.

## Features
- JWT Auth (access + refresh)
- Posts with optional image
- Comments, likes
- User profile (avatar, bio)
- Cloudinary image uploads
- Ready for Render deployment

## Tech
- Node 20, Express
- MongoDB, Mongoose
- Cloudinary uploads via `multer-storage-cloudinary`

## Getting Started

### 1) Prereqs
- Node 20.x (`nvm install 20 && nvm use 20`)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 2) Install
```bash
git clone <this repo>
cd SocialNode-api
cp .env.example .env
npm install
npm run dev
```
Server runs at `http://localhost:5000`

### 3) Environment
Fill `.env`:
```
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/socialnode
JWT_SECRET=your_access
JWT_REFRESH_SECRET=your_refresh
CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

### 4) API Quick Test (with curl)

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Harish","email":"harish@test.com","password":"pass123"}'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"harish@test.com","password":"pass123"}'
```
<!-- 
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OWQ3YjI3NGVmZjA3ZDJjODAyNTE0NyIsImlhdCI6MTc1NTYxMjI4OCwiZXhwIjoxNzU1NjEzMTg4fQ.UucohYIo34slbV4JhZexqi8fZO4DCIcXTUfDnsK1gP8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OWQ3YjI3NGVmZjA3ZDJjODAyNTE0NyIsImlhdCI6MTc1NTYxMjI4OCwiZXhwIjoxNzU2MjE3MDg4fQ.Hqs6oHrFYvtngh96bcfTse0_uNOh64lA0kK_Qj6LpNk",
    "user": {
        "id": "689d7b274eff07d2c8025147",
        "name": "Harish",
        "email": "harish@test.com"
    }
}
 -->

Use access token:[Get-Request]
```bash
TOKEN=<paste token here>
curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/posts
```

Create a post with image:
```bash
curl -X POST http://localhost:5000/api/posts   -H "Authorization: Bearer $TOKEN"   -F "text=Hello world"   -F "image=@/path/to/photo.jpg"
```

### 5) Deploy to Render

- Push this project to GitHub
- Render → New → Web Service
- Build: `npm install`
- Start: `npm start`
- Add env vars from `.env` in the Render dashboard
- Set `CLIENT_ORIGIN` to your React app’s URL

## Notes
- Files are stored on Cloudinary (works on Render with no persistent disk).
- If you need S3 instead, replace `src/middlewares/upload.js` with an S3 storage, and add AWS env keys.

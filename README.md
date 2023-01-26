# Wiki-api
This is a simple exercise project about Rest using Node.js, mongoose and Atlas

## Usage
Create a .env file like this
```
MONGO='your-link-to-atlas'
```
Install and run project

```
npm install 
node app.js
```

you can even run with nodemon

```
nodemon app.js
```
server is running on `localhost:3000`

## Routes

```
GET http://localhost:3000/articles 
POST http://localhost:3000/articles
DELETE http://localhost:3000/articles

GET http://localhost:3000/articles/:articleTitle
POST http://localhost:3000/articles/:articleTitle
PUT http://localhost:3000/articles/:articleTitle
PATCH http://localhost:3000/articles/:articleTitle
DELETE http://localhost:3000/articles/:articleTitle
```

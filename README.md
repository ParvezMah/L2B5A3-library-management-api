# Library Management System API

A full-featured Library Management System built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**. This project enables librarians to manage book inventories and track borrowing activity through well-structured RESTful APIs. 

## Features

### Book Management
- **Create a book** `POST: /api/book/create-book`
- **Get all books** with filtering, sorting, and pagination `GET: http://localhost:3000/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=20&page=1`
- **Get a book information** `GET: /api/books/:bookId`
- **Update book information** `PUT: /api/books/:bookId`
- **Delete a book** `DELETE: /api/books/:bookId`
- **Automatic updates** are `available` when book copies run out

### Borrowing System
- **Borrow a book** `POST: /api/borrow`
- Ensures enough copies are available
- Deducts from inventory
- Updates availability

- **Borrowed Books Summary** `GET: /api/borrow`
- Aggregates the total quantity borrowed
- Shows book title and ISBN

- **Borrowed Books Summary for Single Book** `GET: /api/borrow/:bookId`
- Aggregates the total quantity borrowed
- Shows book title and ISBN


### Validation & Business Logic
- Schema validation (genre enum, required fields, quantity limits)
- Custom error handling
- Mongoose Middleware: `pre-save`, `post-update` logs
- Mongoose static method to manage availability

## Tech Stack
| Layer        | Technology           |
|--------------|----------------------|
| Backend      | Node.js, Express.js  |
| Language     | TypeScript           |
| Database     | MongoDB              |
| Validation   | Built in Mongoosse   |
| Tools        | Postman              |


## Start Projects
```
git clone <Repository>
cd library-management-api

npm install

npm run dev

npm run build
npm run start:dev
```

## Deployment 
Deployed on Vercel
Production Live Link : `https://library-management-api-ruddy.vercel.app/` Not Found Right now



## Author
**Parvez Mahamud**
A passionate full stack developer on a mission to serve indstries with powerful APIs.


## Note on Plagiarism
This project is 100% original and built from scratch by Parvez Mahamud. All business Logic, Schemas, and Controller Logic are implemented selfly 

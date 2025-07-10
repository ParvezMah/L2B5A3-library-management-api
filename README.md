# Library Management System API

A full-featured Library Management System built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**. This project enables librarians to manage book inventories and track borrowing activity through well-structured RESTful APIs. 

## Features

### Book Management
- **Create a book** - `
- **Get all books** with filtering, sorting, and pagination
- **Get a book information**
- **Update book information**
  `PUT - /api/books/686fc8373ce530d1ea40981a`
  ```
  {
    "copies": 10
  }
  ```
  `Response`
  ```
  {
    "success": true,
    "message": "Book has Updated with data",
    "updatedbook": {
        "_id": "686fc8373ce530d1ea40981a",
        "title": "The Theory of Nature",
        "author": "JC Penny",
        "genre": "SCIENCE",
        "isbn": "9780553380188",
        "description": "An overview of Nature.",
        "copies": 10, // Updated
        "available": true,
        "createdAt": "2025-07-10T14:03:35.430Z",
        "updatedAt": "2025-07-10T15:40:18.339Z",
        "__v": 0
    }
}
  ```
- **Delete a book**
- **Automatic availability updates** when book copies run out

### Borrowing System
- **Borrow a book**
- Ensures enough copies are available
- Deducts from inventory
- Updates availability

- **Borrowed Books Summary**
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


## Project Structure

```
/src
  /controllers
  /interfaces
  /models
app.ts
server.ts
```

## Start Projects
```
git clone <Repository>
cd library-management-api

npm install

npm run dev

npm run build
npm run start:dev
```


## API Endpoints


## Video Demo (Optional)


## Author
**Parvez Mahamud**


## Note on Plagiarism
This project is 100% original and built from scratch by Parvez Mahamud. All business Logic, Schemas, and Controller Logic are implemented selfly 

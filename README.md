# BookNest

BookNest is a full-stack web application for managing and discovering books. It features user authentication, book inventory management, and a modern, responsive UI. The project is divided into a client (frontend) built with React and a server (backend) built with Node.js and Express.

---

## Features

### General
- Modern, responsive UI with theme toggle (light/dark mode)
- User authentication (Sign Up, Sign In, JWT-based sessions)
- Dashboard for users to manage their books
- Inventory page to browse all available books
- Landing page with project introduction
- Loading indicators and error handling

### User Authentication
- Register new users (`/api/auth/signup`)
- Login existing users (`/api/auth/signin`)
- JWT-based authentication and protected routes
- User session management

### Book Management
- Add new books (admin/authorized users)
- View all books in inventory (`/api/books`)
- View single book details (`/api/books/:id`)
- Update book details (admin/authorized users)
- Delete books (admin/authorized users)
- Dashboard for managing user-specific books

### Cloudinary Integration
- Image upload and management for book covers

### API Endpoints

#### Auth Endpoints
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/signin` — Login and receive JWT

#### Book Endpoints
- `GET /api/books` — Get all books
- `GET /api/books/:id` — Get details of a single book
- `POST /api/books` — Add a new book (protected)
- `PUT /api/books/:id` — Update a book (protected)
- `DELETE /api/books/:id` — Delete a book (protected)

#### User-Book Endpoints
- (Assumed) Endpoints for managing user-book relationships (e.g., user dashboard)


## Tech Stack
- **Frontend:** React, Vite, Axios, Custom Hooks, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Cloud:** Cloudinary (for image uploads)

---

## Database Schema Reference

### User
```js
{
  _id: ObjectId,
  username: String, // unique
  email: String,    // unique
  password: String, // hashed
  createdAt: Date,
  updatedAt: Date
}
```

### Book
```js
{
  _id: ObjectId,
  title: String,
  author: String,
  description: String,
  coverImage: String, // Cloudinary URL
  genre: String,
  price: Number,
  quantity: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### UserBook (for user-book relationships, e.g., dashboard)
```js
{
  _id: ObjectId,
  user: ObjectId, // ref: 'User'
  book: ObjectId, // ref: 'Book'
  status: String, // e.g., 'owned', 'wishlist', etc.
  createdAt: Date,
  updatedAt: Date
}
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/TusharChauhan09/BookNest.git
   cd BookNest
   ```
2. **Install dependencies:**
   - For server:
     ```sh
     cd server
     npm install
     ```
   - For client:
     ```sh
     cd ../client
     npm install
     ```
3. **Configure environment variables:**
   - Create `.env` files in both `server/` and `client/` as needed (see sample `.env.example` if provided).

4. **Run the application:**
   - Start the backend:
     ```sh
     cd server
     npm start
     ```
   - Start the frontend:
     ```sh
     cd ../client
     npm run dev
     ```

---

## Folder Structure

```
BookNest/
├── client/         # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/
│       └── lib/
├── server/         # Node.js backend
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── model/
│       ├── routes/
│       └── lib/
└── package.json
```

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)

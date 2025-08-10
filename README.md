# Be Shure

Be Shure is a full-stack e-commerce platform that allows users to create and manage their own online shops and products. It provides a seamless experience for both shop owners and customers, with features for browsing products, managing inventory, and processing orders.

## Problem Solved

In today's digital age, many small businesses and individual entrepreneurs struggle to establish an online presence. The complexity and cost of setting up a traditional e-commerce store can be a significant barrier. Be Shure addresses this problem by providing a user-friendly platform that simplifies the process of creating and managing an online shop. It empowers users to showcase their products, reach a wider audience, and grow their business without the need for extensive technical knowledge or a large budget.

## Tech Stack

### Backend

- **Node.js:** A JavaScript runtime environment for building server-side applications.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **Prisma:** A next-generation ORM for Node.js and TypeScript.
- **PostgreSQL:** A powerful, open-source object-relational database system.
- **JWT (JSON Web Tokens):** Used for creating access tokens for authentication.
- **Bcrypt:** A library for hashing passwords.
- **Multer:** Middleware for handling `multipart/form-data`, used for uploading files.
- **Cloudinary:** A cloud-based service for managing images and videos.

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **React Router:** A standard library for routing in React.
- **Redux:** A predictable state container for JavaScript apps.
- **Axios:** A promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **React Hook Form:** A library for managing forms in React.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm
- Git

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/be-shure.git
    cd be-shure
    ```

2.  **Set up the backend**
    ```sh
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory and add the environment variables based on the `.env.sample` file.
    - Set up a PostgreSQL database and update the `DATABASE_URL` in your `.env` file.
    - Run database migrations:
      ```sh
      npx prisma migrate dev
      ```

3.  **Set up the frontend**
    ```sh
    cd ../client/beshure
    npm install
    ```

### Running the Application

1.  **Start the backend server**
    ```sh
    cd backend
    npm run dev
    ```
    The backend server will start on `http://localhost:7000`.

2.  **Start the frontend development server**
    ```sh
    cd ../client/beshure
    npm run dev
    ```
    The frontend development server will start on `http://localhost:3000`.

## API Endpoints

The following are the main API endpoints available:

### User Endpoints (`/api/v1/users`)

-   `POST /new-user`: Register a new user.
-   `POST /login`: Log in a user.
-   `GET /isLoggedIn`: Check if a user is logged in.

### Shop Endpoints (`/api/v1/shops`)

-   `POST /new`: Create a new shop.
-   `GET /list-shops`: Get a list of all shops.
-   `GET /:id`: Get a shop by its ID.
-   `PUT /update/:id`: Update a shop's details.
-   `DELETE /delete/:id`: Delete a shop.

### Product Endpoints (`/api/v1/products`)

-   `POST /new`: Create a new product.
-   `GET /list-products/:shopId`: Get a list of all products for a specific shop.
-   `PUT /update/:id`: Update a product's availability.
-   `GET /search`: Search for nearby products.

## Project Structure

The project is organized into two main directories: `client` and `backend`.

### `backend`

The backend is a Node.js application built with Express.js.

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── db/             # Database connection
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Data models
│   ├── prisma/         # Prisma schema and migrations
│   ├── routes/         # API routes
│   ├── service/        # Business logic
│   └── utils/          # Utility functions
├── .env.sample         # Sample environment variables
├── package.json        # Project dependencies
└── ...
```

### `client`

The frontend is a React application built with Vite.

```
client/
└── beshure/
    ├── src/
    │   ├── api/          # API call functions
    │   ├── assets/       # Static assets
    │   ├── components/   # Reusable UI components
    │   ├── hooks/        # Custom React hooks
    │   ├── pages/        # Page components
    │   ├── store/        # Redux store
    │   └── utils/        # Utility functions
    ├── public/           # Public assets
    ├── package.json      # Project dependencies
    └── ...
```

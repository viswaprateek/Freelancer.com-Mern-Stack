# Freelancers.com

Make sure to install nodejs in your system before running any of the commands:

## Frontend

To run the frontend, follow these steps:

1. Navigate to the frontend directory:
    ```
    cd ./frontend
    ```

2. Install dependencies:
    ```
    npm i
    ```

3. Start the development server:
    ```
    npm run dev
    ```

## Backend

To run the backend, follow these steps:

1. Navigate to the backend directory:
    ```
    cd ./backend
    ```

2. Install dependencies:
    ```
    npm i
    ```
    

3. Start the server with file watching enabled:
    ```
    npm run dev (or)
    nodemon server.js (or)
    node --watch server.js
    ```

## Environment Variables

Make sure to create a `.env` file in the root of your project backend with the following contents:

```env
MONGO_URI="/"
PORT=4000
JWT_SECRET="abcdefgh"
```



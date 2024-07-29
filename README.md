# Exam Ready Server

## Description
Exam Ready Server is a backend application developed for the students who want to examine their general knowledge.
This application is built using TypeScript, Node.js, Express.js, and MongoDB. The application uses Mongoose for data modeling, JWT for API security, bcrypt for password hashing, and Nodemailer for sending emails to users. The codebase is organized using a modular pattern.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)
- [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/mahdimortuza/exam-ready-server.git
    ```
2. Navigate to the project directory
    ```bash
    cd exam-ready-server
    ```
3. Install the dependencies
    ```bash
    npm install
    ```
4. Set up the environment variables (see [Environment Variables](#environment-variables))
5. Start the server
    ```bash
    npm start
    ```

## Usage
### Running the server
To start the server in development mode, use:
```bash
npm run start:dev
```
## Environment Variables
### Setup your environment variables in the .env.example  file and rename the file to .env
- `NODE_DEV`=development
- `PORT`=Port number the server listens on. Default: 5000
- `DATABASE_URL`=URI for MongoDB database.
- `BCRYPT_SALT_ROUND`=12
- `DEFAULT_PASSWORD`=Default password
- `JWT_ACCESS_SECRET`=Secret key for JWT access token generation.
- `JWT_REFRESH_SECRET`=Secret key for JWT refresh token generation.
- `JWT_ACCESs_EXPIRES_IN`=JWT access token expiration time
- `JWT_REFRESH_EXPIRES_IN`=JWT refresh token expiration time
- `RESET_PASSWORD_UI_LINK`=http://localhost:3000
- `SUPER_ADMIN_EMAIL`=Your super admin emil
- `SUPER_ADMIN_PASSWORD`=your super admin password

# API Documentation
## Register user
- API Endpoints:
  - POST `/api/auth/login`
    - Description: Authenticates user and returns a JWT token.
    - Request: 
        ```json
        { 
            "email": "example@email.com", 
            "password": "password" 
        }
        ```
    - Response: 
        ```json
        {
            "success": true, 
            "message": "User registered successfully"
        }
        ```

  - POST `/api/auth/register`
    - Description: Registers a new user.
    - Request:
        ```json
        { 
            "name": "John", 
            "email": "example@email.com", 
            "password": "password" 
        }
        ```
    - Response: 
        ```json
        {
            "success": true,
            "message": "Login successful",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoMkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNzg1MDYyMSwiZXhwIjoxNzA3OTM3MDIxfQ.7EahSgmPLPNuZ_T9ok-B6TayWCJVdxPzi_Nx4UfrhvY"
        }
        ```


## Dependencies:
- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongodb`: MongoDB driver for Node.js.
- `nodemon`: Utility for automatically restarting the server during development.

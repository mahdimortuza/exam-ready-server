# Exam Ready Server

## Description

Exam Ready Server is a backend application developed for the students who want to examine their general knowledge.
This application is built using TypeScript, Node.js, Express.js, and MongoDB. The application uses Mongoose for data modeling, JWT for API security, bcrypt for password hashing, and Nodemailer for sending emails to users. The codebase is organized using a modular pattern.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
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
   npm run start:dev
   ```

## Scripts

## Running the server

### To build the server, use:

```bash
npm run build
```

### To start the server in development mode, use:

```bash
npm run start:dev
```

### To start the server in production mode, use:

```bash
npm run start:prod
```

### To fix code using ESlint, use:

```bash
npm run lint:fix
```

### To fix code using Prettier, use:

```bash
npm run prettier:fix
```

## Environment Variables

### Setup your environment variables in the .env.example file and rename the file to .env

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

## User management endpoints

- API Endpoints:

  - POST `/api/v1/users/create-normal-user`

    - Description: Creates an user and returns user data.
    - Request:
      ```json
      {
        "password": "123",
        "normalUser": {
          "name": {
            "firstName": "John",
            "lastName": "Doe"
          },
          "gender": "male",
          "email": "user@gmail.com",
          "contactNo": "123-456-7890",
          "collage": "Example University"
        }
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "User is created successfully",
        "data": [
          {
            "user": "66a7173b87ac16113a042afd",
            "name": {
              "firstName": "John",
              "lastName": "Doe",
              "_id": "66a7173b87ac16113a042b00"
            },
            "gender": "male",
            "email": "user@gmail.com",
            "contactNo": "123-456-7890",
            "collage": "Example University",
            "isDeleted": false,
            "_id": "66a7173b87ac16113a042aff",
            "__v": 0,
            "fullName": "JohnDoe",
            "id": "66a7173b87ac16113a042aff"
          }
        ]
      }
      ```

  - get `/api/v1/normal-user`
    - Description: Returns all normal users (only admin can retrieve data)

## Student management endpoints

- API Endpoints:

  - POST `/api/v1/users/create-student`

    - Description: Creates a student and returns student data (only admin can create a student).
    - Request:
      ```json
      {
        "password": "123",
        "student": {
          "name": {
            "firstName": "John",
            "lastName": "Doe"
          },
          "gender": "male",
          "email": "student@gmail.com",
          "contactNo": "123-456-7890",
          "collage": "Example University"
        }
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Student is created successfully",
        "data": [
          {
            "user": "66a719d387ac16113a042b0c",
            "name": {
              "firstName": "John",
              "lastName": "Doe",
              "_id": "66a719d387ac16113a042b0f"
            },
            "gender": "male",
            "email": "student@gmail.com",
            "contactNo": "123-456-7890",
            "collage": "Example University",
            "isDeleted": false,
            "_id": "66a719d387ac16113a042b0e",
            "__v": 0,
            "fullName": "JohnDoe",
            "id": "66a719d387ac16113a042b0e"
          }
        ]
      }
      ```

  - get `/api/v1/students`

    - Description: Returns all students (only admin can retrieve data)

  - get `/api/v1/students/:id`

    - Description: Returns student students (only admin can retrieve data)

  - patch `/api/v1/students/:id`

    - Description: update single student (only admin can update data)

  - delete `/api/v1/students/:id`
    - Description: update single student (only admin can update data)

## Admin management endpoints

- API Endpoints:

  - POST `/api/v1/users/create-admin`

    - Description: Creates an admin and returns admin data (only super admin can create an admin).
    - Request:
      ```json
      {
        "password": "123",
        "admin": {
          "name": {
            "firstName": "John",
            "lastName": "Doe"
          },
          "gender": "male",
          "email": "admin@gmail.com",
          "contactNo": "123-456-7890"
        }
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Admin is created successfully",
        "data": [
          {
            "user": "66a71b4587ac16113a042b11",
            "name": {
              "firstName": "John",
              "lastName": "Doe",
              "_id": "66a71b4687ac16113a042b14"
            },
            "gender": "male",
            "email": "admin@gmail.com",
            "contactNo": "123-456-7890",
            "isDeleted": false,
            "_id": "66a71b4687ac16113a042b13",
            "__v": 0,
            "fullName": "JohnDoe",
            "id": "66a71b4687ac16113a042b13"
          }
        ]
      }
      ```

  - get `/api/v1/admins`

    - Description: Returns all admins (only super admin can retrieve data)

  - get `/api/v1/admins/:id`

    - Description: Returns admins (only super admin can retrieve data)

  - patch `/api/v1/admins/:id`

    - Description: update single admin (only super admin can update data)

  - delete `/api/v1/admins/:id`
    - Description: update single admin (only super admin can update data)

## Student plus management endpoints

- API Endpoints:

  - POST `/api/v1/users/create-student-plus`

    - Description: Creates a studentPlus and returns studentPlus data (only admin can create).
    - Request:
      ```json
      {
        "password": "123",
        "studentPlus": {
          "name": {
            "firstName": "John",
            "lastName": "Doe"
          },
          "gender": "male",
          "email": "student.plus@gmail.com",
          "contactNo": "123-456-7890",
          "collage": "Example University"
        }
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Student plus is created successfully",
        "data": [
          {
            "user": "66a71cad87ac16113a042b17",
            "name": {
              "firstName": "John",
              "lastName": "Doe",
              "_id": "66a71cae87ac16113a042b1a"
            },
            "gender": "male",
            "email": "student.plus@gmail.com",
            "contactNo": "123-456-7890",
            "collage": "Example University",
            "isDeleted": false,
            "_id": "66a71cae87ac16113a042b19",
            "__v": 0,
            "fullName": "JohnDoe",
            "id": "66a71cae87ac16113a042b19"
          }
        ]
      }
      ```

  - get `/api/v1/users/student-plus`

    - Description: Returns studentPlus (only admin admin can retrieve data)

  - get `/api/v1/users/student-plus/:id`

    - Description: Returns admins (only admin can retrieve data)

  - patch `/api/v1/users/student-plus/:id`

    - Description: update single admin (only admin can update data)

  - delete `/api/v1/users/student-plus/:id`
    - Description: update single admin (only admin can update data)

## Student role management endpoints

- API Endpoints:

  - POST `/api/v1/users/change-role/:id`

    - Description: Creates a studentPlus and returns studentPlus data (only admin can create).
    - Request:
      ```json
      {
        "role": "studentPlus"
      }
      ```
    - Response:

      ```json
      {
        "success": true,
        "message": "Student role is updated successfully",
        "data": {
          "_id": "6677e9bd5456799a4cbe42bf",
          "email": "normal.user@gmail.com",
          "needsPasswordChange": true,
          "role": "studentPlus",
          "isPaid": "unPaid",
          "status": "in-progress",
          "isDeleted": false,
          "createdAt": "2024-06-23T09:24:13.725Z",
          "updatedAt": "2024-07-29T04:41:09.724Z",
          "__v": 0
        }
      }
      ```

## Status management endpoints

- API Endpoints:

  - POST `/api/v1/users/change-status/:id`

    - Description: Change user status to in-progress or blocked (only admin can change).
    - Request:
      ```json
      {
        "status": "blocked"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "User status is updated successfully",
        "data": {
          "_id": "66a71cad87ac16113a042b17",
          "email": "student.plus@gmail.com",
          "needsPasswordChange": true,
          "role": "studentPlus",
          "isPaid": "unPaid",
          "status": "blocked",
          "isDeleted": false,
          "createdAt": "2024-07-29T04:38:05.936Z",
          "updatedAt": "2024-07-29T04:47:53.553Z",
          "__v": 0
        }
      }
      ```

## Get me endpoint

- API Endpoints:

  - GET `/api/v1/users/me`

    - Description: Get the information of current users (all user can see this).
    - Request:

      - requests with access token

    - Response:
      ```json
      {
        "success": true,
        "message": "User is retrieved successfully",
        "data": {
          "_id": "6673be2a15413057036eb26e",
          "user": {
            "_id": "6673be2915413057036eb26c",
            "email": "rrahat415@gmail.com",
            "needsPasswordChange": true,
            "role": "admin",
            "isPaid": "unPaid",
            "status": "in-progress",
            "isDeleted": false,
            "createdAt": "2024-06-20T05:29:14.004Z",
            "updatedAt": "2024-06-23T09:12:50.829Z",
            "__v": 0
          },
          "name": {
            "firstName": "admin",
            "lastName": "vai",
            "_id": "6673be2a15413057036eb26f"
          },
          "gender": "male",
          "email": "rrahat415@gmail.com",
          "contactNo": "123-456-7890",
          "isDeleted": false,
          "__v": 0,
          "fullName": "adminvai",
          "id": "6673be2a15413057036eb26e"
        }
      }
      ```

## Authentication endpoints

- API Endpoints:

  - POST `/api/v1/auth/login`

  - Description: Login user, students, studentPlus, admin, super admin.
    - Request:
      ```json
      {
        "email": "example@gmail.com",
        "password": "123"
      }
      ```

- POST `/api/v1/auth/change-password`

  - Description: Change password user, students, studentPlus, admin, super admin.
    - Request:
      ```json
      {
        "oldPassword": "123",
        "newPassword": "456"
      }
      ```

- POST `/api/v1/auth/forget-password`

  - Description: Forget password user, students, studentPlus, admin, super admin.
    - Request:
      ```json
      {
        "email": "exammple@gmail.com"
      }
      ```

- POST `/api/v1/auth/refresh-token`

  - Description: Get refresh token user, students, studentPlus, admin, super admin.
    - Request:
      ```json
      {
        "email": "example@gmail.com",
        "password": "123"
      }
      ```

## Subjects management

- API Endpoints:

  - POST `/api/v1/subjects/create-subject-name`

  - Description: Creates subject name for quiz.

    - Request:

      ```json
      {
        "subjectName": "bangla",
        "createdBy": "666538cbf0c4fba6e89603a3"
      }
      ```

    - GET `/api/v1/subjects`

      - Description: Get all subject names for quiz.

    - GET `/api/v1/subjects/:id`

      - Description: Get single subject name for quiz.

    - PATCH `/api/v1/subjects/:id`

      - Description: Update single subject for quiz.

    - DELETE `/api/v1/subjects/:id`

      - Description: Delete single subject name for quiz.

## Quiz management

- API Endpoints:

  - POST `/api/v1/quizzes/create-exam-quiz`

  - Description: Creates a quiz.

    - Request:

      ```json
      {
        "subjectName": "66653bd0f0c4fba6e89603bf",
        "question": "What is the capital of China?",
        "options": ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"],
        "correctOption": "Beijing",
        "description": "Beijing is the capital of the People's Republic of China and the world's third most populous city proper.",
        "createdBy": "666538cbf0c4fba6e89603a3"
      }
      ```

    - GET `/api/v1/quizzes`

      - Description: Get all quiz names for quiz.

    - GET `/api/v1/quizzes:id`

      - Description: Get single quiz.

    - PATCH `/api/v1/quizzes:id`

      - Description: Update single

    - DELETE `/api/v1/quizzes:id`

      - Description: Delete single quiz.

## Exam participation

- API Endpoints:

- GET `/api/v1/participation/exam`

  - Description: Start an exam (only user, student and studentPlus can access).

- POST `/api/v1/participation/exam`

  - Description: Submit the exam (only user, student and studentPlus can access).

    - Request:

      ```json
      {
        "studentId": "666538a8f0c4fba6e896039e",
        "answers": [
          {
            "questionId": "66653c15f0c4fba6e89603c4",
            "answer": "Paris"
          },
          {
            "questionId": "66653c45f0c4fba6e89603c9",
            "answer": "Berlin"
          },
          {
            "questionId": "66653c82f0c4fba6e89603cf",
            "answer": "Ottawa"
          },
          {
            "questionId": "66653c90f0c4fba6e89603d2",
            "answer": "Canberra"
          },
          {
            "questionId": "66653ceff0c4fba6e89603da",
            "answer": "Rome"
          },
          {
            "questionId": "66653dcbf0c4fba6e89603e6",
            "answer": "Ottawa"
          },
          {
            "questionId": "66653d94f0c4fba6e89603e3",
            "answer": "Ottawa"
          }
        ]
      }
      ```

    - Response:
      ```json
      {
        "success": true,
        "message": "Quiz submitted successfully",
        "data": {
          "correctAnswers": 5,
          "incorrectAnswers": 2,
          "totalQuestions": 7,
          "totalScore": 4,
          "negativeScore": 1,
          "scorePercentage": 57.14285714285714
        }
      }
      ```

## Result management

- API Endpoints:

  - GET `/api/v1/results`

    - Description: Gets all result of all students (only admins can access).

  - GET `/api/v1/results/`

    - Description: Gets single student all result(only user, student and studentPlus can access).

  - GET `/api/v1/results/:studentId/:examId`

    - Description: Gets single student single result(only user, student and studentPlus can access).

# Dependencies:

- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongoose`: MongoDB driver for Node.js.
- `cookie-parser`: To send token to client.
- `http-status`: HTTP status sends status code in response.
- `nodemailer`: Nodemailer is used to send email using SMTP.
- `zod`: Zod is a JavaScript validation library.

# Tests

- No test cases are written yet.

# Contributing

- Contribution policy will be provided letter.

# License

Copyright (c) 2024, Mahdi Mortuza

All rights reserved. This software and associated documentation files may not be used, copied, modified, merged, published, distributed, sublicensed, and/or sold, in any manner, without the prior written permission of the copyright owner.

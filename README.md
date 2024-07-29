# Exam Ready Server

## Description
Exam Ready Server is a backend application developed for the students who want to examine their general knowledge.
This application is built using TypeScript, Node.js, Express.js, and MongoDB. The application uses Mongoose for data modeling, JWT for API security, bcrypt for password hashing, and Nodemailer for sending emails to users. The codebase is organized using a modular pattern.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
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

## Environment Variables
### Setup your environment variables in the .env.example  file and rename the file to .env
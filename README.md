# Getting started

## Installation

Clone the repository

    git clone https://github.com/adrianpura/user-management.git

Switch to the repo folder

    cd user-management

Install dependencies
    
    npm install

Copy config file

    cp .env.example .env

## Database

The codebase implements TypeORM with a mySQL database.

----------
Create a new mysql database with the name `user-management`

Set mysql database settings in .env

    DB_TYPE=mysql
    DB_PORT=3306
    DB_HOST=localhost
    DB_USER=your-mysql-username
    DB_PASS=your-mysql-password
    DB_NAME=user-management

Start local mysql server and create new database 'user-management'


## NPM scripts
 - `npm run build` - creates a build directory with a production build of your app
 - `npm run migration:run` - runs migration
 - `npm run seed:run` - seeds the database
 - `npm run start:watch` - Start application in watch mode


 # Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------
 
# Swagger API docs

This example repo uses the NestJS swagger module for API documentation. [User Management Docs](http://localhost:3000/docs/)

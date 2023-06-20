## This is a fullstack project using React, Apollo, GraphQL and express. The database stores Projects and clients. Each client can be associated to its respective project. User can create project and client, update project, delete project and client. When a project is deleted the client is also removed from the database. 

## Run the client and server
* npm i
* npm run start

## Server
* GraphQL
* Node.js
* Express
* Using a package called express-graphql which is GraphQlserver form Node.js with tools to use with express.  

## Client
* Apollo 
* React 
* Bootstrap

## Database
* MongoDB + Atlas (allows us to use MongoDB in the cloud)
* Mongoose to connect to MongoDB and create database models

## CRUD Functionality

## Mongoose Schema
* mongoose schema is not related to graphql schema. The mongoose layer (object data map layer) lives on top of the database. This schema includes fields for our database collections. On top of the mongoose layer is graphql schema layer.

## Schema
* schema is used for fetching data 

## Mutations
* includes CRUD functions.   

## installing the client
* npx create-react-app client
will make a seperate client folder in the root dir. 
* npm i @apollo/client graphql react-router-dom react-icons

## Styling
using bootstrap. 

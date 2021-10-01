# Mongo DB Rest API
This is a RESTful API for a MongoDB Database, written in Node.js. This project uses the web framework Express.js. It handles errors gracefully by returning standard error codes, allows filtering, sorting and pagination, includes JWT Authentication and role based authorization, has an in memory caching system and can be easily versioned.

## Getting Started
In order to run this API, first you will have to clone the repository and install the dependencies. If you do not have npm installed, you will need to do so.
```bash
git clone https://github.com/JamesRao98/mongoApi
cd mongoApi
npm install
```
Next you will have to set environment variables. If you are in a development environment you can do this by creating a file named .env in the root directory of the repository. In this file you will need to enter the the variables below. You will need to have a MongoDB instance set up either locally or on the cloud. Enter the url for your MongoDB instance where instructed below.
```
DB_CONNECT=<Your Database URL>
PORT=3000
TOKEN_SECRET=this is a secret
```
If you are deploying to a production environment, you should set the environment variables directly in the host. To start the api, run the following command.
```bash
npm start
```
After the api has started you will be able to send http requests to http://locahost:3000 or whatever port you specified.

## Configuration
This API has been configured with two primary collections: Players and Games.

### Players
Players have two String fields: 
* firstName
* lastName

### Games
Games have two String fields and a Number field: 
* playerOne
* playerTwo
* outcome

When outcome is 0 it means it was tie, when it is one it means playerOne won, and when its 2 it means playerTwo won. 

### Users
There is also a User resource that is not publicly accessible and only used for Authentication and Authorization. Currently you must be Authenticated to access either the Players or the Games collection, and you must also have 'admin' role to be Authorized to access the Games collection. 

### Caching
All GET requests are set to be cached for five minutes.

## Endpoints
```
GET /v1/players/:_id?
```
Used to retrieve one or more players.
### Path Parameters
* _id (String ID of player)

### Query Parameters
* firstName (used for filtering)
* lastName (used for filtering)
* sort (player field to sort by)
* direction ("asc" or "desc")
* limit (Number of entries to return)
* skip (Number of entries to skip)

```
POST /v1/players
```
Used to create a Player.

### Body Parameters (JSON)
* firstName 
* lastName 
```
PUT /v1/players/:_id
```
Used to replace a Player
### Path Parameters
* _id (String ID of Player)

### Body Parameters (JSON)
* firstName 
* lastName 

```
DELETE /v1/players/:_id
```
Used to remove a player.
### Path Parameters
* _id (String ID of Player)
```
GET /v1/games/:_id?
```
Used to retrieve one or more games.
### Path Parameters
* _id (String ID of Game)

### Query Parameters
* playerOne (String ID of a player)
* playerTwo (String ID of a player)
* outcome (Number indicating outcome, 0 => Tie, 1 => playerOne won, 2 => playerTwo won)
* sort (Game field to sort by)
* direction ("asc" or "desc")
* limit (Number of entries to return)
* skip (Number of entries to skip)

```
POST /v1/games
```
Used to create a Game.

## Body Parameters (JSON)
* playerOne (String ID of a player)
* playerTwo (String ID of a player)
* outcome (Number indicating outcome, 0 => Tie, 1 => playerOne won, 2 => 
```
PUT /v1/games/:_id
```
Used to replace a Game
## Path Parameters
* _id (String ID of Game)

## Body Parameters (JSON)
* playerOne (String ID of a player)
* playerTwo (String ID of a player)
* outcome (Number indicating outcome, 0 => Tie, 1 => playerOne won, 2 => 
```
DELETE /v1/games/:_id?
```
Used to remove a Game.
## Path Parameters
* _id (String ID of Game)
```
POST /v1/users/create
```
Used to create a User.
## Body Parameters (JSON)
* email (String email address of User)
* password (String password of User)
```
POST /v1/users/login
```
Used to Authenticate a User
## Body Parameters (JSON)
* email (String email address of User)
* password (String password of User)

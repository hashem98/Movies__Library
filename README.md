# Movies-Library  - Project Version

**Author Name**: Hashem Smadi

# WRRC
![WRRC](/wrrc__.png)
# WRRC2
![WRRC2](/wrrcapi.png)
# WRRC3
![WRRC3](/wrrcsql.png)
# WRRC4
![WRRC3](/CRUDwrrc.png)

## Overview
this is a web site to bring a data from API and show it  
## Getting Started
* you must have a internet connection
* you should have a ubunto anf connect with git hub 
* you should Initialize by running the following command "npm init -y"
* you should Install the required packages to run  this project: npm install express cors axios pg
* install Postgres Database by command "brew install postgresql"
* create databse named "movie"
* connect data base with server using command  "psql -d movie -f schema.sql"
* send your (post url ) on postman programm
* start server command "npm start"
* /UPDATE/id  to update  a specific movie in the database.
* /DELETE/id  to remove a specific movie from the database.
* getMovie/id:  to get a specific movie from the database
* # I've put APIKEY and PORT in .env file 

## Project Features
- show movies from ApI
- add favorite movie to a list 
- add a movies to data base 
- get a movies to data base 
- update a movie from database
- delet a movie from database
- bring a specific movie from database
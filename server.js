'use strict';
 let error404={
    "status": 404,
    "responseText": "Sorry, page not found "
    };
const express = require('express');
const cors = require('cors');
const movieData = require('./Movie Data/data.json');

const server = express();
server.use(cors());

server.get('/',handelHome);
server.get('/favorite',handelFavorite);
server.get('*',handelNotFound);
server.use(errorHandler);



function Movie(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
   
 }

function handelHome(req,res){
    let movie = [];
    // movieData.forEach(val=>{
        let obj ;
    //     movie.push(obj);
    // }) its temp  cause i dont wanna show format like array 
    // for (var key of Object.keys(movieData)) {
        obj = new Movie(movieData.title, movieData.poster_path, movieData.overview);
        // movie.push(obj)
    
    
    

    return res.status(200).json(obj);
    
}
function handelNotFound(req,res){
    res.status(404).json(error404)
 }
function handelFavorite(req,res){
    return res.status(200).send("Welcome to Favorite Page");
}
function errorHandler (error,req,res){
    const err ={
        status : 500,
        message : error

    }
    res.status(500).send(err);
}


// i have aproblem on port 3000
server.listen(5050, ()=>{
    console.log("listinig to port 5050");
})

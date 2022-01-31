'use strict';



require('dotenv').config();
const express=require('express');
const cors = require('cors');
const dataMovie =require('./movie Data/data.json');
const axios = require('axios');

const PORT = process.env.PORT;

const server=express();
server.use(cors());


server.get('/', handelData);
server.get('/favorite',handelfavorite);
server.get('/trending',handeltrending);
server.get('/search',handelsearch);
server.get('*',handelNotFound);
server.use(handelservererror);


let url =`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`;
let number=2;
let userSearch = "Dune";
let userSearch2 = "Sing 2";


function handelservererror (error,req , res){

   const err ={
       status : 500,
       message : error
   }

     res.status(500).send(err);

}

function Movei (id , title , release_date , poster_path , overview){
    this.id = id;    
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    }
   
   
   
function handelsearch(req , res){
    // let newArr = [];
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=the+${userSearch}`;

    axios.get(url)
    .then(results=>{
        let movies = results.data.results.map(val =>{
            return new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview);
        });
        res.status(200).json(movies);  
     }).catch(err=>{

    })
















}

    

function handeltrending(req , res){

    let newArr = [];
    axios.get(url)
     .then((results)=>{
      
        results.data.results.forEach(val =>{
                 newArr.push(new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview));
        
        });
        
      
         res.status(200).json(newArr);

    }).catch((err)=>{

    })
}
 





function handelNotFound(req , res){
    res.status(404).send('This page does not exist :/ ');
}




function handelData(req,res){
    // let movie=[];
    let obj;
    obj= new Movei(dataMovie.title, dataMovie.poster_path, dataMovie.overview);
    return res.status(200).json(obj);

    
}

function handelfavorite(req,res){
    res.status(200).send("Welcome to Favorite Page :) ");
}





server.listen(PORT,()=>{
    console.log("my server is listining to port 5050");
})
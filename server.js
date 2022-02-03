'use strict';



require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const dataMovie = require('movieData/data.json');
const axios = require('axios');
const pg = require('pg');
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);

const server = express();
server.use(cors());
server.use(express.json());
server.get('/', handelData);
server.get('/favorite', handelfavorite);
server.get('/trending', handeltrending);
server.get('/search', handelsearch);

server.get('/horror', handelsearchHorror);
server.get('/comedy', handelsearchComedy);

server.post('/addMovie', addMovie);
server.get('/getMovies', getMovie);

server.put('/UPDATE/:id', updateMovieHandler);
server.delete('/DELETE/:id', deleteMovieHandler);
server.get('/getMovie/:id',oneMovieHandler);

server.get('*', handelNotFound);
server.use(handelservererror);


let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`;
let number = 2;
// let userSearch = "Dune";
let userSearch2 = "Sing 2";


function handelservererror(error, req, res) {

    const err = {
        status: 500,
        message: error
    }

    res.status(500).send(err);

}

function Movei(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}



function handelsearch(req, res) {
    let userSearch = req.query.userSearch;
    // let newArr = [];
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${userSearch}`;

    axios.get(url)
        .then(results => {
            let movies = results.data.results.map(val => {
                return new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview);
            });
            res.status(200).json(movies);
        }).catch(err => {
            handelservererror(err, req, res);
        })


}

function handelsearchHorror(req, res) {
    //since, 27 is the genre id for Horror
    let url1 = `http://api.themoviedb.org/3/discover/movie?api_key=${process.env.APIKEY}&with_genres=27`
    axios.get(url1)
        .then(results => {
            let movies = results.data.results.map(val => {
                return new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview);
            });
            res.status(200).json(movies);
        }).catch(err => {
            handelservererror(err, req, res);
        })
}

function handelsearchComedy(req, res) {
    //since, 27 is the genre id for Horror
    let url2 = `http://api.themoviedb.org/3/discover/movie?api_key=${process.env.APIKEY}&with_genres=35`
    axios.get(url2)
        .then(results => {
            let movies = results.data.results.map(val => {
                return new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview);
            });
            res.status(200).json(movies);
        }).catch(err => {
            handelservererror(err, req, res);
        })
}
function addMovie(req, res) {
    const movie = req.body;
    let sql = `INSERT INTO movie(title,release_date,poster_path,overview) VALUES ($1,$2,$3,$4) RETURNING *;`
    let values = [movie.title, movie.release_date, movie.poster_path, movie.overview];
    client.query(sql, values).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        handelservererror(error, req, res)
    });
}
function getMovie(req, res) {
    let sql = `SELECT * FROM movie;`;
    client.query(sql).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        handelservererror(error, req, res)
    });
}

function handeltrending(req, res) {

    let newArr = [];
    axios.get(url)
        .then((results) => {

            results.data.results.forEach(val => {
                newArr.push(new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview));

            });


            res.status(200).json(newArr);

        }).catch((err) => {
            handelservererror(err, req, res);

        })
}


function updateMovieHandler(req, res) {
    const id = req.params.id;
    const movie = req.body;
    const sql = `UPDATE movie SET title =$1, release_date = $2, poster_path = $3 ,overview=$4 WHERE id=$5 RETURNING *;`;
    let values = [movie.title, movie.release_date, movie.poster_path, movie.overview, id];
    client.query(sql, values).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        errorHandler(error, req, res)
    });
}

function deleteMovieHandler(req, res) {
    const id = req.params.id;
    const sql = `DELETE FROM movie WHERE id=${id};` 
    

    client.query(sql).then(()=>{
        res.status(204).json({});
    }).catch(error=>{
        errorHandler(error,req,res)
    });
}

function handelNotFound(req, res) {
    res.status(404).send('This page does not exist :/ ');
}

function oneMovieHandler (req,res){
    const id = req.params.id;
    let sql = `SELECT * FROM movie WHERE id=${id};`;
    

    client.query(sql).then(data=>{
       res.status(200).json(data.rows);
    }).catch(error=>{
        errorHandler(error,req,res)
    });
}


// function handelData(req, res) {
//     // let movie=[];
//     let obj;
//     obj = new Movei(dataMovie.title, dataMovie.poster_path, dataMovie.overview);
//     return res.status(200).json(obj);


// }

function handelfavorite(req, res) {
    res.status(200).send("Welcome to Favorite Page :) ");
}




client.connect().then(() => {
    server.listen(PORT, () => {
        console.log("my server is listining to port 5050");
    })
}).catch(error => {
    handelservererror(error, req, res)
});

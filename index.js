
// Importando o express e atribuindo a uma constante
// const express = require('express');

// Instanciando um app do express
// const app = express();

// index.js
// Importando o express       
import express from "express";
// Instanciando um app do express 
const app = express();

// Chamando a função do app que vai escutar requisições em uma determinada porta
app.listen(3000);


app.get('/', (req, res) => {
    // headers
    // res.set('Content-Type', 'text/plain');

    // res.status = 201;
    // res.json({message: "Hello World!"});

    // Ou numa linha só
    res.status(200).json({message: "Hello World!"});
});


// app.post('/', (req, res) => {
//     res.send('Hello World!')
// });
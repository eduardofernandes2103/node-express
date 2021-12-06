
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

// MANIPULANDO O OBJETO REQUEST
// route params
app.get('/resources/:resource_id/subitens/:item_id', (req, res) => {
    const params = req.params
    res.json(params)
})

// Query params
app.get('/resources', (req, res) => {
    const queryParams = req.query;
    res.json(queryParams);
});


// app.post('/', (req, res) => {
//     res.send('Hello World!')
// });
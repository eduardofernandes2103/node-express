// Importando o express e atribuindo a uma constante
const express = require('express');

// Instanciando um app do express
const app = express();

// Chamando a função do app que vai escutar requisições em uma determinada porta
app.listen(3000);


app.get('/', (req, res) => {
    res.send('Hello World!')
});


// app.post('/', (req, res) => {
//     res.send('Hello World!')
// });
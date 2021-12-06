# Inicializando um projeto Node
Gerenciador de pacotes yarn
Para instalar o yarn, usamos o gerenciador de pacotes padrão, o npm:

npm install --global yarn
Instalamos de forma global, pois iremos precisar dele para inicializar os projetos com node.

Inicializando um projeto em um diretório
Dentro do diretório do projeto:

yarn init -y
Esse comando vai gerar o package.json que é o arquivo com configurações do nosso projeto.

O parâmetro -y vai preencher automaticamente algumas informações constantes no arquivo package.json.

Iniciando com o express
yarn add express
Vai gerar o diretório node_modules com os arquivos desse framework, além de adicionar essa dependência no arquivo package.json.

Após instalado, vamos subir a menor aplicação possível usando o express:

// index.js

// Importando o express e atribuindo a uma constante
const express = require('express');

// Instanciando um app do express
const app = express();

// Chamando a função do app que vai escutar requisições em uma determinada porta
app.listen(3000);
Executamos esse código com:

node index.js
O terminal vai ficar parado após a execução do comando, pois está executando o método que espera as requisições.

Podemos testar acessando pelo navegador o endereço http://localhost:3000

A resposta deve ser a seguinte:

Cannot GET /
Isso significa que o endpoint GET / não existe, então, vamos ver como criar esse endpoint:

Antes de chamar o método listen, adicione o seguinte bloco:

app.get('/', (req, res) => {
    res.send('Hello World!')
});
O método get, do nosso objeto app, vai registrar um endpoint que responde com o texto puro Hello World! no caminho / da nossa aplicação.

Os parâmetros que a arrow function recebe são o request (req) e a response (res).

Alterando o tipo de requisição
Para alterar o método HTTP ao qual esse endpoint vai responder, é necessário chamar a função correspondente. Por exemplo, trocando nossa requisição por um post:

app.post('/', (req, res) => {
    res.send('Hello World!')
});
Dica!
Experimente alterar a porta em que a aplicação vai escutar, o método da requisição e a mensagem de retorno!

Nesse conteúdo, vimos como instalar as ferramentas básicas, inicializar um projeto usando o framework express, colocar um app simples para rodar e criar rotas que respondem à diferentes métodos.

------------------------------------------------------------------------------------------------------------------------------

# Configurando código para rodar Import/Export
Atualizando código da aula anterior
Na Aula anterior criamos um código básico usando yarn e a sintaxe de require padrão do JS, agora iremos atualizar aquele código para que possamos usar a sintaxe de ES6 import/export, além de adicionar mais algumas dependencias.

Iniciando nodemon e sucrase
Dentro do diretório do projeto:

yarn add nodemon sucrase 
Vai gerar mais uma depêndencia no seu package.json, além de atualizar seu diretório node_modules

Após instalado devemos criar um arquivo chamado nodemon.json dentro do diretório da sua aplicação, que deve conter:

{
    "execMap": {
        "js": "node -r sucrase/register",
    }
}
E dentro do nosso package.json devemos inserir o seguinte código no objeto geral do arquivo:


"scripts": {
    "dev":  "nodemon index.js"
}
    
Pronto, com isso nós temos as configurações básicas para poder realizar os imports dentro do nosso index.js, onde o Sucrase compila a sintaxe ES6 e o Nodemon garante que o codigo sejá recompilado automaticamente a cada mudança.

Aviso!
Para que o Sucrase funcione é necessário garantir que o node esteja sempre atualizado, para que não ocorram erros.

Refatorando para import/from
Agora basta alterar a sintaxe da nossa importação no arquivo index.js:

// index.js
// Importando o express       
import express from "express";
// Instanciando um app do express 
const app = express();
Feito isso basta rodar nosso CLI no terminal:

yarn dev
Onde dev é o nome dado ao script no arquivo de configurações, e poderia ser qualquer outro nome escolhido. Devemos obter algo similar a isso:

yarn run v1.22.17
$ nodemon index.js
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `sucrase-node index.js`
O terminal vai ficar parado após a execução do comando, pois está executando o método que espera as requisições.

Agora podemos testar as requisições que foram feitas na aula anterior, tanto o método GET quanto o método POST para garantir que esteja tudo funcionando perfeitamente.

Sempre que você salvar o arquivo o servidor será reiniciado para cobrir as novas mudanças, para testar isso tente atualizar o texto do seu método GET e atualizar a pagina da web na porta 3000.

Dica!
Experimente exportar a nossa constante app para um arquivo server.js, só não esqueça de alterar a configuração do script no package.json.

Nesse conteúdo, conhecemos o nodemon e o babel, tambem vimos como refatorar o código de require() para o uso de ES6 com import/export garantindo praticidade e performance no código, além de claro, deixa-lo mais atualizado e bem escrito.
---------------------------------------------------------------------------------------------------------------------
# Manipulando o objeto response
Alterando o tipo do body:
Já vimos como utilizar o método send() para enviar uma resposta simples.

Quando estamos desenvolvendo APIs REST, normalmente vamos devolver as respostas às requisições no formato JSON. Para fazermos isso, podemos usar o método json() que consta no objeto recebido por parâmetro res:

app.get('/', (req, res) => {
    res.json({message: "Hello World!"});
});
Usamos aqui um objeto como exemplo, mas lembrando que poderia também ser um array.

Alterando o código de status da resposta
Podemos também alterar o código de status da resposta, da seguinte forma:

app.post('/', (req, res) => {
    res.status = 201;
    res.json({message: "Resource created!"});

    // Ou em uma só linha:
    res.status(201).json({message: "Resource created!"});
});
Alteramos o status code padrão (200) pelo 201.

Adicionando cabeçalhos (headers) à resposta
Caso seja necessário adicionar algum header específico na resposta à uma requisição, podemos adicionar ou alterar passando sua chave e o valor:

app.get('/', (req, res) => {

    // Adicionando o header que define o tipo de conteúdo da resposta.
    res.set('Content-Type', 'text/plain');
    res.json({message: "Testando cabeçalhos."});
});
Dica!
Apesar de ser possível inspecionar os cabeçalhos pelo navegador, é melhor utilizar um cliente como o Postman ou Insomnia.

Caso deseje alterar mais de um cabeçalho:

res.set({
    'Content-Type': 'text/plain',
    'Content-Length': '10000',
});
Nesse conteúdo, vimos como alterar os principais pontos de uma resposta http: tipo do body, status code e headers.
----------------------------------------------------------------------------------------------------------------------

# Manipulando o objeto request
Recebendo parâmetros na URL (Route Params)
Usados para identificar um recurso na nossa API REST, podemos receber variáveis na URL da seguinte forma:

// index.js

app.get('/resources/:resource_id/subitens/:item_id', (req, res) => {
    const params = req.params
    res.json(params)
})
As variáveis estarão contidas no objeto req.params. Estamos atribuindo à uma constante e depois retornando na própria rota somente para ficar fácil de visualizar como esse dado chega e acessá-lo como resposta da nossa requisição.

Acesse a seguinte URL no navegador ou em um cliente HTTP para visualizar melhor: GET http://localhost:3000/resources/1/subitens/2

A resposta será:

{
    "resource_id": "1",
    "item_id": "2"
}
Ou seja, podemos utilizar cada parâmetro recebido pela url acessando suas chaves, assim:

const resource_id = req.params.resource_id;
console.log(resource_id);
Ou usando desestruturação:

const { resource_id } = req.params;
console.log(resource_id);
Recebendo parâmetros na URL (Query Params)
Além das urls dinâmicas, temos os query parameters que podem ser recebidos pela url, para acessá-los o processo é semelhante ao visto anteriormente:

// index.js
app.get('/resources', (req, res) => {
    const queryParams = req.query;
    res.json(queryParams);
});
Ao fazer uma requisição passando alguns query parameters, como esta: GET http://localhost:3000/resources?order_by=asc&max_itens=100

A resposta será:

{
    "order_by": "asc",
    "max_itens": "100"
}
Importante!
Os query parameters não precisam ser especificados, podem ser passados de modo livre pelo cliente e caso não sejam utilizados pelo backend são simplesmente ignorados.

Recebendo parâmetros no body
Para acessarmos os dados do corpo de uma requisição de forma mais fácil, vamos precisar adicionar um middleware em nossa aplicação. Em resumo, um middleware é algo que vai acontecer no meio do processo para todas as requisições, no nosso caso, queremos que os dados que chegam da requisição já estejam padronizados como JSON.

Importante!
Um pouco mais adiante vamos entender melhor o que é um middleware e como funcionam no Express.js.

Para adicionar o middleware padrão de JSON do Express, precisamos passá-lo como parâmetro para o método use no nosso app, para que as requisições comecem a passar pelo middleware quando chegarem:

// Instanciando um app do express
import express from "express";
const app = express();

app.use(express.json());
Agora, podemos tentar acessar o corpo da requisição no padrão json assim:

// index.js
app.post('/resources', (req, res) => {
    const data = req.body
    res.json(data)
});
Ao fazer uma requisição POST passando alguns dados, devemos receber os mesmos dados como resposta.

Nesse conteúdo, vimos como acessar os principais tipos de dados que podem acompanhar uma requisição. Experimente testar diferentes possibilidades e combinações para adquirir experiência com os tópicos que vimos até aqui. Se esbarrar em algum problema, conte com o time de ensino!
--------------------------------------------------------------------------------------------------
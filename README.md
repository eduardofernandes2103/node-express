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